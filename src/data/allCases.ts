import { Achievement, CaseDefinition, VerdictEvaluation, VerdictSubmission } from '../types/case';
import { CASES_1_TO_3 } from './cases/cases1to3';
import { CASES_4_TO_6 } from './cases/cases4to6';
import { CASES_7_TO_10 } from './cases/cases7to10';

export const ALL_CASES: CaseDefinition[] = [
  ...CASES_1_TO_3,
  ...CASES_4_TO_6,
  ...CASES_7_TO_10,
];

export function getCaseById(caseId: string): CaseDefinition {
  return ALL_CASES.find((c) => c.id === caseId) || ALL_CASES[0];
}

export function getCaseByLevel(levelNumber: number): CaseDefinition {
  return ALL_CASES.find((c) => c.levelNumber === levelNumber) || ALL_CASES[0];
}

export function getDeterministicInterrogationAnswer(
  caseId: string,
  suspectId: string,
  question: string
): string {
  const activeCase = getCaseById(caseId);
  const suspect = activeCase.suspects.find((s) => s.id === suspectId);
  if (!suspect) {
    return 'I have nothing further to add to my official statement, Detective.';
  }

  const normalized = question.toLowerCase();

  // Check exact or partial Q&A match
  for (const qa of suspect.interrogationQA) {
    if (
      qa.question.toLowerCase() === normalized ||
      qa.keywords.some((kw) => normalized.includes(kw.toLowerCase()))
    ) {
      return qa.answer;
    }
  }

  // Check general topic keywords
  if (normalized.includes('alibi') || normalized.includes('where were you')) {
    return `As I stated for the record: ${suspect.initialAlibi}`;
  }
  if (normalized.includes('motive') || normalized.includes('why')) {
    return `${suspect.publicStatement}`;
  }
  if (normalized.includes('know') || normalized.includes('observe') || normalized.includes('see')) {
    return suspect.relevantKnowledge[0] || suspect.publicStatement;
  }

  return `${suspect.publicStatement} If you have specific physical evidence, present it.`;
}

export function evaluateCaseAccusation(
  activeCase: CaseDefinition,
  submission: VerdictSubmission
): VerdictEvaluation {
  const { solution } = activeCase;
  const isCulpritCorrect = submission.culpritId === solution.culpritId;

  // 1. Culprit Identification (Max 30)
  const culpritScore = isCulpritCorrect ? 30 : 0;

  // 2. Motive Deduction (Max 20)
  let motiveScore = 0;
  const selectedMotiveObj = activeCase.motiveOptions.find((m) => m.id === submission.motiveId);
  const motiveTextLower = (submission.motiveText || '').toLowerCase();
  const matchedMotiveKeywords = solution.motiveKeywords.filter((kw) =>
    motiveTextLower.includes(kw.toLowerCase())
  ).length;

  if (isCulpritCorrect) {
    if (selectedMotiveObj?.isCorrect) {
      motiveScore += 14;
    }
    if (matchedMotiveKeywords >= 2) {
      motiveScore += 6;
    } else if (matchedMotiveKeywords === 1 || (submission.motiveText || '').trim().length > 20) {
      motiveScore += 4;
    }
    motiveScore = Math.min(20, motiveScore);
  }

  // 3. Opportunity & Method (Max 20)
  let opportunityScore = 0;
  const selectedOppObj = activeCase.opportunityOptions.find((o) => o.id === submission.opportunityId);
  const combinedOppText = `${submission.opportunityText || ''} ${submission.sequenceOfEvents || ''}`.toLowerCase();
  const matchedOppKeywords = solution.opportunityKeywords.filter((kw) =>
    combinedOppText.includes(kw.toLowerCase())
  ).length;

  if (isCulpritCorrect) {
    if (selectedOppObj?.isCorrect) {
      opportunityScore += 14;
    }
    if (matchedOppKeywords >= 2) {
      opportunityScore += 6;
    } else if (matchedOppKeywords === 1 || combinedOppText.trim().length > 20) {
      opportunityScore += 4;
    }
    opportunityScore = Math.min(20, opportunityScore);
  }

  // 4. Supporting Evidence Citation (Max 20)
  const decisiveSet = new Set(solution.decisiveClueIds);
  let decisiveMatches = 0;
  for (const cid of submission.supportingClueIds || []) {
    if (decisiveSet.has(cid)) decisiveMatches++;
  }
  const evidenceScore = isCulpritCorrect ? Math.min(20, decisiveMatches * 5) : Math.min(10, decisiveMatches * 3);

  // 5. Confirmed Contradictions Bonus (Max 10)
  const contradictionBonus = isCulpritCorrect
    ? Math.min(10, (submission.confirmedContradictionsCount || 0) * 4)
    : 0;

  // 6. Time Bonus (Max 15)
  const timeRatio = Math.max(0, Math.min(1, submission.remainingSeconds / activeCase.timeLimitSeconds));
  const timeBonus = isCulpritCorrect ? Math.round(timeRatio * 15) : 0;

  // 7. Penalties (Hints & Wrong Accusations)
  const hintPenalty = (submission.hintsUsed || 0) * 5;
  const wrongAccusationPenalty = (submission.wrongAccusations || 0) * 10;

  const rawTotal =
    culpritScore +
    motiveScore +
    opportunityScore +
    evidenceScore +
    contradictionBonus +
    timeBonus -
    hintPenalty -
    wrongAccusationPenalty;

  const totalScore = isCulpritCorrect ? Math.max(35, Math.min(100, rawTotal)) : Math.max(0, Math.min(30, rawTotal));

  let rank: VerdictEvaluation['rank'] = 'F';
  if (isCulpritCorrect) {
    if (totalScore >= 90) rank = 'S';
    else if (totalScore >= 75) rank = 'A';
    else if (totalScore >= 60) rank = 'B';
    else rank = 'C';
  } else {
    rank = 'F';
  }

  return {
    totalScore,
    rank,
    isCulpritCorrect,
    culpritScore,
    motiveScore,
    opportunityScore,
    evidenceScore,
    contradictionBonus,
    timeBonus,
    hintPenalty,
    wrongAccusationPenalty,
    completionTimeSeconds: submission.elapsedSeconds,
    remainingTimeSeconds: submission.remainingSeconds,
    hintsUsed: submission.hintsUsed,
    feedbackSummary: isCulpritCorrect
      ? rank === 'S'
        ? `Flawless S-Rank Indictment! You unmasked ${solution.culpritName} with ironclad forensic precision and rapid deduction.`
        : `Case Solved! You proved ${solution.culpritName} was responsible and recovered the target evidence.`
      : `Indictment Rejected. The forensic record exonerates your chosen suspect. Review the contradictions and physical logs before re-filing.`,
    breakdown: {
      culpritFeedback: isCulpritCorrect
        ? `Correctly indicted ${solution.culpritName} (+30 pts).`
        : 'Accused an innocent party (0 pts).',
      motiveFeedback:
        motiveScore >= 14
          ? `Accurately established the perpetrator’s motive (+${motiveScore} pts).`
          : `Partial motive substantiation (+${motiveScore} pts).`,
      opportunityFeedback:
        opportunityScore >= 14
          ? `Demonstrated exact physical method and timeline (+${opportunityScore} pts).`
          : `Partial opportunity reconstruction (+${opportunityScore} pts).`,
      evidenceFeedback: `Attached ${decisiveMatches} of ${solution.decisiveClueIds.length} decisive forensic exhibits (+${evidenceScore} pts).`,
      timeFeedback: `Solved with ${Math.floor(submission.remainingSeconds / 60)}m ${submission.remainingSeconds % 60}s remaining (+${timeBonus} time bonus, -${hintPenalty} hint penalty).`,
    },
  };
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_case_solved',
    title: 'First Indictment',
    description: 'Solve Case 001: The Missing Masterpiece.',
    icon: 'Award',
  },
  {
    id: 'contradiction_hunter',
    title: 'Cross-Examiner',
    description: 'Prove 3 contradictions across your investigations using physical evidence.',
    icon: 'Flame',
  },
  {
    id: 'speed_sleuth',
    title: 'Clockwork Detective',
    description: 'Solve any timed investigation with more than 3 minutes remaining on the clock.',
    icon: 'Clock',
  },
  {
    id: 'no_hints_needed',
    title: 'Pure Deduction',
    description: 'Solve a case without using a single investigative hint.',
    icon: 'Sparkles',
  },
  {
    id: 'rank_s_master',
    title: 'S-Rank Inspector',
    description: 'Achieve an S-Rank evaluation (90+ points) on any case.',
    icon: 'Star',
  },
  {
    id: 'halfway_there',
    title: 'Senior Investigator',
    description: 'Complete 5 levels of Case Zero.',
    icon: 'ShieldCheck',
  },
  {
    id: 'architect_unmasked',
    title: 'Case Zero Mastermind',
    description: 'Solve Level 10 (CASE ZERO) and unmask Architect Zero.',
    icon: 'Crown',
  },
  {
    id: 'perfectionist',
    title: 'Grand Commissioner',
    description: 'Complete all 10 cases in the Case Zero campaign.',
    icon: 'Trophy',
  },
];
