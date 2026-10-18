import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  getCaseById,
  getDeterministicInterrogationAnswer,
  evaluateCaseAccusation,
} from './src/data/allCases.ts';
import { VerdictSubmission } from './src/types/case.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

interface FeedbackRecord {
  id: string;
  name?: string;
  email?: string;
  message: string;
  timestamp: string;
}
const feedbackSubmissions: FeedbackRecord[] = [];

// Multi-Level AI Interrogation API Route
app.post('/api/interrogate', async (req, res) => {
  const { caseId = 'case-001', suspectId, question, history } = req.body;

  if (!suspectId || !question) {
    return res.status(400).json({ error: 'Missing suspectId or question parameter' });
  }

  const activeCase = getCaseById(caseId);
  const suspect = activeCase.suspects.find((s) => s.id === suspectId);
  if (!suspect) {
    return res.status(404).json({ error: 'Suspect not found in this case' });
  }

  const deterministicMatch = getDeterministicInterrogationAnswer(caseId, suspectId, question);

  if (ai) {
    try {
      const isCulprit = activeCase.solution.culpritId === suspect.id;
      const systemInstruction = `You are roleplaying as ${suspect.name}, a ${suspect.age}-year-old ${suspect.role} in Level ${activeCase.levelNumber} (${activeCase.code}: ${activeCase.title}) of the detective game "CASE ZERO — THE AI MYSTERY LAB".

CASE PREMISE:
Location: ${activeCase.location} (${activeCase.timeframe})
${activeCase.premise}

YOUR CHARACTER PROFILE:
Name: ${suspect.name}
Role: ${suspect.role}
Personality: ${suspect.personality}
Public Statement: "${suspect.publicStatement}"
Initial Alibi: "${suspect.initialAlibi}"
Private Secret (Do not confess easily; only show defensiveness or admit partial facts when confronted with specific clues): "${suspect.privateInformation}"
Knowledge you possess:
${suspect.relevantKnowledge.map((k) => `- ${k}`).join('\n')}
Predefined Q&A Anchors:
${suspect.interrogationQA.map((qa) => `Q: ${qa.question} -> A: ${qa.answer}`).join('\n')}

CANONICAL CASE SOLUTION (NEVER CONTRADICT THESE FACTS OR INVENT NEW EVIDENCE):
- True Culprit: ${activeCase.solution.culpritName}
- True Motive: ${activeCase.solution.motiveSummary}
- True Method/Opportunity: ${activeCase.solution.opportunitySummary}
- Where the missing item is hidden: ${activeCase.solution.keyTargetLocation}

ROLEPLAY RULES:
1. Stay 100% in character as ${suspect.name}. Never mention AI, prompts, or being a simulation.
2. ${
        isCulprit
          ? 'You are the secret culprit. Maintain your cover story, act offended if accused without proof, and deflect blame onto circumstances or protocol.'
          : 'You are innocent of the crime. Answer honestly from your perspective and point out suspicious behavior or clues you noticed.'
      }
3. Keep your response concise, sharp, and atmospheric (2 to 3 sentences maximum).`;

      const formattedContents = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          formattedContents.push({
            role: item.sender === 'player' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: question }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.65,
          topP: 0.9,
        },
      });

      const text = response.text || deterministicMatch;
      return res.json({
        response: text.trim(),
        isFallback: false,
      });
    } catch {
      return res.json({
        response: deterministicMatch,
        isFallback: true,
      });
    }
  }

  return res.json({
    response: deterministicMatch,
    isFallback: true,
  });
});

// Multi-Level Verdict Evaluation API
app.post('/api/evaluate-verdict', (req, res) => {
  const submission: VerdictSubmission = req.body;
  const activeCase = getCaseById(submission.caseId || 'case-001');
  const evaluation = evaluateCaseAccusation(activeCase, submission);
  return res.json(evaluation);
});

// Feedback API Route
app.post('/api/feedback', (req, res) => {
  const { name, email, message } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  const record: FeedbackRecord = {
    id: `FB-${Date.now()}`,
    name: name?.trim() || 'Anonymous Detective',
    email: email?.trim() || '',
    message: message.trim(),
    timestamp: new Date().toISOString(),
  };

  feedbackSubmissions.push(record);

  return res.json({
    success: true,
    savedLocally: false,
    message: 'Feedback recorded on the Case Zero server. Thank you for getting in touch!',
    submissionId: record.id,
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root: 'dist' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CASE ZERO server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
