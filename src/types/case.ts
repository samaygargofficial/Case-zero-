export type PortraitTheme = 'curator' | 'restorer' | 'heir' | 'security';

export interface Suspect {
  id: string;
  name: string;
  role: string;
  age: number;
  portraitTheme: PortraitTheme;
  personality: string;
  relationshipToCase: string;
  possibleMotive: string;
  initialAlibi: string;
  relevantKnowledge: string[];
  publicStatement: string;
  privateInformation: string;
  statements: SuspectStatement[];
  interrogationQA: {
    question: string;
    answer: string;
    keywords: string[];
  }[];
}

export interface SuspectStatement {
  id: string;
  suspectId: string;
  topic: string;
  quote: string;
  timestampClaim?: string;
  locationClaim?: string;
}

export interface Clue {
  id: string;
  title: string;
  category: 'log' | 'forensic' | 'document' | 'physical';
  description: string;
  discoveryLocation: string;
  relevantTimestamp?: string;
  establishes: string;
  relatedSuspectIds: string[];
  isDiscovered?: boolean;
  isImportant?: boolean;
  hotspotX?: number; // percentage 10-90 for crime scene inspection
  hotspotY?: number; // percentage 15-85 for crime scene inspection
}

export interface ContradictionRule {
  id: string;
  statementId: string;
  clueId: string;
  verdict: 'CONTRADICTION' | 'INCONSISTENCY' | 'UNVERIFIED';
  title: string;
  explanation: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  displayTime: string;
  title: string;
  description: string;
  source: string;
  suspectId?: string;
  clueId?: string;
  status: 'CONFIRMED' | 'UNCERTAIN' | 'CONTRADICTED';
  conflictNote?: string;
}

export interface CaseDefinition {
  id: string;
  levelNumber: number;
  code: string;
  title: string;
  subtitle: string;
  difficulty: 'Standard' | 'Challenging' | 'Expert' | 'Mastermind';
  timeLimitSeconds: number; // e.g., 300 to 480 seconds
  location: string;
  date: string;
  timeframe: string;
  premise: string;
  crimeSceneDescription: string;
  crimeSceneZoneNames: string[];
  victimItem: {
    title: string;
    artistOrOwner: string;
    yearOrCode: string;
    estimatedValue: string;
    mediumOrType: string;
    description: string;
  };
  hints: string[];
  motiveOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  opportunityOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  suspects: Suspect[];
  clues: Clue[];
  contradictionRules: ContradictionRule[];
  timeline: TimelineEvent[];
  solution: {
    culpritId: string;
    culpritName: string;
    motiveSummary: string;
    opportunitySummary: string;
    actualSequence: string[];
    keyTargetLocation: string;
    decisiveClueIds: string[];
    motiveKeywords: string[];
    opportunityKeywords: string[];
    clearedSuspectsExplanation: {
      suspectId: string;
      reason: string;
    }[];
  };
}

export interface ChatMessage {
  id: string;
  sender: 'player' | 'suspect';
  suspectId: string;
  text: string;
  timestamp: string;
  isFallback?: boolean;
}

export interface LevelStats {
  levelNumber: number;
  caseId: string;
  unlocked: boolean;
  completed: boolean;
  bestScore: number;
  bestRank: 'S' | 'A' | 'B' | 'C' | 'F' | null;
  fastestTimeSeconds: number | null;
  attempts: number;
}

export interface ActiveLevelState {
  caseId: string;
  levelNumber: number;
  remainingSeconds: number;
  elapsedSeconds: number;
  discoveredClueIds: string[];
  importantClueIds: string[];
  clueNotes: Record<string, string>;
  questionedSuspectIds: string[];
  confirmedContradictionIds: string[];
  investigationNotes: string;
  suspectedCulpritId: string | null;
  selectedMotiveId: string;
  selectedOpportunityId: string;
  linkedClueIds: string[];
  unansweredQuestions: string[];
  hintsUsed: number;
  wrongAccusations: number;
  caseCompleted: boolean;
  caseFailed: boolean;
  lastEvaluation?: VerdictEvaluation;
  chatHistory: Record<string, ChatMessage[]>;
}

export interface VerdictSubmission {
  caseId: string;
  culpritId: string;
  motiveId?: string;
  opportunityId?: string;
  motiveText: string;
  opportunityText: string;
  sequenceOfEvents: string;
  supportingClueIds: string[];
  remainingSeconds: number;
  elapsedSeconds: number;
  hintsUsed: number;
  confirmedContradictionsCount: number;
  wrongAccusations: number;
}

export interface VerdictEvaluation {
  totalScore: number;
  rank: 'S' | 'A' | 'B' | 'C' | 'F';
  isCulpritCorrect: boolean;
  culpritScore: number; // max 30
  motiveScore: number; // max 20
  opportunityScore: number; // max 20
  evidenceScore: number; // max 20
  contradictionBonus: number; // max 10
  timeBonus: number; // max 15
  hintPenalty: number; // deduction
  wrongAccusationPenalty: number; // deduction
  completionTimeSeconds: number;
  remainingTimeSeconds: number;
  hintsUsed: number;
  feedbackSummary: string;
  breakdown: {
    culpritFeedback: string;
    motiveFeedback: string;
    opportunityFeedback: string;
    evidenceFeedback: string;
    timeFeedback: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  timerMultiplier: 1 | 1.5 | 2;
  sandboxUnlockAll: boolean;
  tutorialSeen: boolean;
}
