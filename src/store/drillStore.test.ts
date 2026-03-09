import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDrillStore } from './drillStore';
import type { DrillSessionRecord, DrillQuestionAttempt } from '../types';

// Mock supabase to prevent real API calls
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    },
  },
}));

// ── Helpers ──────────────────────────────────────────────────────

function makeAttempt(overrides: Partial<DrillQuestionAttempt> = {}): DrillQuestionAttempt {
  return {
    key: 'lesson-1:q1',
    moduleId: 'mod-1',
    lessonId: 'lesson-1',
    questionId: 'q1',
    selectedAnswer: 0,
    correct: true,
    responseTimeMs: 1500,
    ...overrides,
  };
}

function makeSession(overrides: Partial<DrillSessionRecord> = {}): DrillSessionRecord {
  return {
    id: 'session-1',
    startedAt: Date.now() - 60_000,
    completedAt: Date.now(),
    settings: {
      moduleIds: ['mod-1'],
      questionCount: 5,
      questionTypes: ['multiple-choice'],
      immediateFeedback: false,
    },
    totalQuestions: 5,
    correctAnswers: 3,
    accuracy: 60,
    attempts: [],
    ...overrides,
  };
}

// ── Tests ────────────────────────────────────────────────────────

describe('drillStore', () => {
  beforeEach(() => {
    // Reset store state between tests
    useDrillStore.setState({ drillSessions: [], questionHistory: {} });
    // Clear localStorage
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('saveDrillSession', () => {
    it('adds session to drillSessions array', () => {
      const session = makeSession();
      useDrillStore.getState().saveDrillSession(session);

      const { drillSessions } = useDrillStore.getState();
      expect(drillSessions).toHaveLength(1);
      expect(drillSessions[0]).toEqual(session);
    });

    it('prepends new session to the front of the array', () => {
      const session1 = makeSession({ id: 'session-1' });
      const session2 = makeSession({ id: 'session-2' });

      useDrillStore.getState().saveDrillSession(session1);
      useDrillStore.getState().saveDrillSession(session2);

      const { drillSessions } = useDrillStore.getState();
      expect(drillSessions[0].id).toBe('session-2');
      expect(drillSessions[1].id).toBe('session-1');
    });

    it('limits history to 100 sessions', () => {
      // Add 101 sessions
      for (let i = 0; i < 101; i++) {
        useDrillStore.getState().saveDrillSession(makeSession({ id: `session-${i}` }));
      }

      const { drillSessions } = useDrillStore.getState();
      expect(drillSessions).toHaveLength(100);
    });

    it('updates questionHistory for correct answers', () => {
      const session = makeSession({
        attempts: [
          makeAttempt({ key: 'lesson-1:q1', correct: true }),
        ],
      });

      useDrillStore.getState().saveDrillSession(session);

      const { questionHistory } = useDrillStore.getState();
      expect(questionHistory['lesson-1:q1']).toBeDefined();
      expect(questionHistory['lesson-1:q1'].attempts).toBe(1);
      expect(questionHistory['lesson-1:q1'].correct).toBe(1);
      expect(questionHistory['lesson-1:q1'].missStreak).toBe(0);
    });

    it('updates questionHistory for incorrect answers', () => {
      const session = makeSession({
        attempts: [
          makeAttempt({ key: 'lesson-1:q1', correct: false }),
        ],
      });

      useDrillStore.getState().saveDrillSession(session);

      const { questionHistory } = useDrillStore.getState();
      expect(questionHistory['lesson-1:q1'].attempts).toBe(1);
      expect(questionHistory['lesson-1:q1'].correct).toBe(0);
      expect(questionHistory['lesson-1:q1'].missStreak).toBe(1);
    });

    it('resets missStreak to 0 on correct answer after misses', () => {
      // First session: wrong
      useDrillStore.getState().saveDrillSession(
        makeSession({ id: 's1', attempts: [makeAttempt({ key: 'lesson-1:q1', correct: false })] }),
      );
      // Second session: wrong again
      useDrillStore.getState().saveDrillSession(
        makeSession({ id: 's2', attempts: [makeAttempt({ key: 'lesson-1:q1', correct: false })] }),
      );
      // Third session: correct
      useDrillStore.getState().saveDrillSession(
        makeSession({ id: 's3', attempts: [makeAttempt({ key: 'lesson-1:q1', correct: true })] }),
      );

      const { questionHistory } = useDrillStore.getState();
      expect(questionHistory['lesson-1:q1'].missStreak).toBe(0);
      expect(questionHistory['lesson-1:q1'].attempts).toBe(3);
      expect(questionHistory['lesson-1:q1'].correct).toBe(1);
    });

    it('increments missStreak on consecutive wrong answers', () => {
      useDrillStore.getState().saveDrillSession(
        makeSession({ id: 's1', attempts: [makeAttempt({ key: 'lesson-1:q1', correct: false })] }),
      );
      useDrillStore.getState().saveDrillSession(
        makeSession({ id: 's2', attempts: [makeAttempt({ key: 'lesson-1:q1', correct: false })] }),
      );

      const { questionHistory } = useDrillStore.getState();
      expect(questionHistory['lesson-1:q1'].missStreak).toBe(2);
    });

    it('tracks multiple questions in a single session', () => {
      const session = makeSession({
        attempts: [
          makeAttempt({ key: 'lesson-1:q1', correct: true }),
          makeAttempt({ key: 'lesson-1:q2', correct: false }),
        ],
      });

      useDrillStore.getState().saveDrillSession(session);

      const { questionHistory } = useDrillStore.getState();
      expect(questionHistory['lesson-1:q1'].correct).toBe(1);
      expect(questionHistory['lesson-1:q2'].correct).toBe(0);
      expect(questionHistory['lesson-1:q2'].missStreak).toBe(1);
    });
  });

  describe('clearDrill', () => {
    it('resets drillSessions to empty array', () => {
      useDrillStore.setState({ drillSessions: [makeSession()] });
      useDrillStore.getState().clearDrill();
      expect(useDrillStore.getState().drillSessions).toEqual([]);
    });

    it('resets questionHistory to empty object', () => {
      useDrillStore.setState({
        questionHistory: { 'lesson-1:q1': { attempts: 5, correct: 3, missStreak: 1, lastSeen: Date.now() } },
      });
      useDrillStore.getState().clearDrill();
      expect(useDrillStore.getState().questionHistory).toEqual({});
    });
  });

  describe('loadDrill', () => {
    it('loads sessions from localStorage', () => {
      const userId = 'user-123';
      const sessions = [makeSession()];
      const history = { 'lesson-1:q1': { attempts: 1, correct: 1, missStreak: 0, lastSeen: Date.now() } };

      localStorage.setItem(
        `botanica:drill:${userId}`,
        JSON.stringify({ drillSessions: sessions, questionHistory: history }),
      );

      useDrillStore.getState().loadDrill(userId);

      const state = useDrillStore.getState();
      expect(state.drillSessions).toHaveLength(1);
      expect(state.drillSessions[0].id).toBe('session-1');
    });

    it('loads questionHistory from localStorage', () => {
      const userId = 'user-123';
      const history = { 'lesson-1:q1': { attempts: 3, correct: 2, missStreak: 1, lastSeen: 12345 } };

      localStorage.setItem(
        `botanica:drill:${userId}`,
        JSON.stringify({ drillSessions: [], questionHistory: history }),
      );

      useDrillStore.getState().loadDrill(userId);

      const state = useDrillStore.getState();
      expect(state.questionHistory['lesson-1:q1']).toEqual(history['lesson-1:q1']);
    });

    it('returns empty state when no localStorage data exists', () => {
      useDrillStore.getState().loadDrill('user-nonexistent');

      const state = useDrillStore.getState();
      expect(state.drillSessions).toEqual([]);
      expect(state.questionHistory).toEqual({});
    });

    it('returns empty state on malformed localStorage data', () => {
      localStorage.setItem('botanica:drill:user-bad', 'not valid json{{{');
      useDrillStore.getState().loadDrill('user-bad');

      const state = useDrillStore.getState();
      expect(state.drillSessions).toEqual([]);
      expect(state.questionHistory).toEqual({});
    });
  });
});
