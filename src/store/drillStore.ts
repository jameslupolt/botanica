import { create } from 'zustand';
import type { DrillQuestionHistory, DrillSessionRecord } from '../types';
import { supabase } from '../lib/supabase';

interface DrillState {
  drillSessions: DrillSessionRecord[];
  questionHistory: Record<string, DrillQuestionHistory>;
  loadDrill: (userId: string) => void;
  saveDrillSession: (session: DrillSessionRecord) => void;
  clearDrill: () => void;
}

function drillKey(userId: string): string {
  return `botanica:drill:${userId}`;
}

function loadDrillLocal(userId: string): {
  drillSessions: DrillSessionRecord[];
  questionHistory: Record<string, DrillQuestionHistory>;
} {
  try {
    const raw = localStorage.getItem(drillKey(userId));
    if (!raw) return { drillSessions: [], questionHistory: {} };
    const parsed = JSON.parse(raw) as {
      drillSessions?: DrillSessionRecord[];
      questionHistory?: Record<string, DrillQuestionHistory>;
    };
    return {
      drillSessions: parsed.drillSessions ?? [],
      questionHistory: parsed.questionHistory ?? {},
    };
  } catch {
    return { drillSessions: [], questionHistory: {} };
  }
}

function saveDrillLocal(
  userId: string,
  drillSessions: DrillSessionRecord[],
  questionHistory: Record<string, DrillQuestionHistory>,
) {
  const payload = JSON.stringify({ drillSessions, questionHistory });
  localStorage.setItem(drillKey(userId), payload);
}

async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
}

export const useDrillStore = create<DrillState>()((set, get) => ({
  drillSessions: [],
  questionHistory: {},

  loadDrill: (userId: string) => {
    const localDrill = loadDrillLocal(userId);
    set({
      drillSessions: localDrill.drillSessions,
      questionHistory: localDrill.questionHistory,
    });
  },

  saveDrillSession: (session: DrillSessionRecord) => {
    const nextHistory = { ...get().questionHistory };
    for (const attempt of session.attempts) {
      const prev = nextHistory[attempt.key] ?? {
        attempts: 0,
        correct: 0,
        missStreak: 0,
        lastSeen: session.completedAt,
      };
      const attempts = prev.attempts + 1;
      const correct = prev.correct + (attempt.correct ? 1 : 0);
      const missStreak = attempt.correct ? 0 : prev.missStreak + 1;
      nextHistory[attempt.key] = {
        attempts,
        correct,
        missStreak,
        lastSeen: session.completedAt,
      };
    }

    const nextSessions = [session, ...get().drillSessions].slice(0, 100);

    set({
      drillSessions: nextSessions,
      questionHistory: nextHistory,
    });

    // Persist synchronously after state update - localStorage.setItem is sync,
    // so no data is lost if the app crashes between set() and persist.
    getCurrentUserId().then((userId) => {
      if (!userId) return;
      saveDrillLocal(userId, nextSessions, nextHistory);
    });
  },

  clearDrill: () => {
    set({
      drillSessions: [],
      questionHistory: {},
    });
  },
}));
