import { create } from 'zustand';
import type {
  DrillQuestionHistory,
  DrillSessionRecord,
  LessonProgress,
  UserProgress,
} from '../types';
import { ACHIEVEMENTS } from '../data/achievements';
import { ALL_LESSONS } from '../data';
import { supabase } from '../lib/supabase';

interface ProgressState extends UserProgress {
  drillSessions: DrillSessionRecord[];
  questionHistory: Record<string, DrillQuestionHistory>;
  loading: boolean;
  error: string | null;
  loadProgress: (userId: string) => Promise<void>;
  startLesson: (lessonId: string) => void;
  completeSection: (lessonId: string, sectionId: string) => void;
  submitQuiz: (lessonId: string, score: number, totalQuestions: number) => void;
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  getCompletedCount: () => number;
  getTotalQuizAverage: () => number;
  updateStreak: () => void;
  saveDrillSession: (session: DrillSessionRecord) => void;
  resetProgress: () => void;
  clearLocal: () => void;
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
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

// Debounced sync: collect pending writes and flush
let syncTimeout: ReturnType<typeof setTimeout> | null = null;
const pendingLessons = new Set<string>();
let pendingSettings = false;

function scheduleLessonSync(lessonId: string, getState: () => ProgressState, setState: (updates: Partial<ProgressState>) => void) {
  pendingLessons.add(lessonId);
  pendingSettings = true;
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => flushSync(getState, setState), 500);
}

async function flushSync(getState: () => ProgressState, setState: (updates: Partial<ProgressState>) => void) {
  syncTimeout = null;
  const userId = await getCurrentUserId();
  if (!userId) return;

  let hadSyncError = false;
  try {
    const state = getState();
    const ids = [...pendingLessons];
    pendingLessons.clear();

    for (const lessonId of ids) {
      const lp = state.lessonProgress[lessonId];
      if (!lp) continue;

      const { error } = await supabase.from('lesson_progress').upsert(
        {
          user_id: userId,
          lesson_id: lp.lessonId,
          completed: lp.completed,
          sections_completed: lp.sectionsCompleted,
          quiz_score: lp.quizScore,
          quiz_attempts: lp.quizAttempts,
          started_at: new Date(lp.startedAt).toISOString(),
          completed_at: lp.completedAt ? new Date(lp.completedAt).toISOString() : null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' },
      );

      if (error) {
        hadSyncError = true;
        pendingLessons.add(lessonId);
      }
    }

    if (pendingSettings) {
      const { error } = await supabase.from('user_settings').upsert(
        {
          user_id: userId,
          unlocked_achievements: state.unlockedAchievements,
          streak: state.streak,
          last_active_date: state.lastActiveDate || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      );
      if (error) {
        hadSyncError = true;
      } else {
        pendingSettings = false;
      }
    }
  } catch {
    hadSyncError = true;
  }

  if (hadSyncError) {
    setState({ error: 'Some progress could not be synced. We will retry automatically.' });
    if (!syncTimeout) {
      syncTimeout = setTimeout(() => flushSync(getState, setState), 2_000);
    }
    return;
  }

  setState({ error: null });
}

export const useProgressStore = create<ProgressState>()((set, get) => ({
  lessonProgress: {},
  unlockedAchievements: [],
  streak: 0,
  lastActiveDate: '',
  drillSessions: [],
  questionHistory: {},
  loading: false,
  error: null,

  loadProgress: async (userId: string) => {
    set({ loading: true });
    try {
      const [lessonsRes, settingsRes] = await Promise.all([
        supabase.from('lesson_progress').select('*').eq('user_id', userId),
        supabase.from('user_settings').select('*').eq('user_id', userId).single(),
      ]);

      const lessonProgress: Record<string, LessonProgress> = {};
      if (lessonsRes.data) {
        for (const row of lessonsRes.data) {
          lessonProgress[row.lesson_id] = {
            lessonId: row.lesson_id,
            completed: row.completed,
            sectionsCompleted: row.sections_completed ?? [],
            quizScore: row.quiz_score,
            quizAttempts: row.quiz_attempts,
            startedAt: new Date(row.started_at).getTime(),
            completedAt: row.completed_at ? new Date(row.completed_at).getTime() : null,
          };
        }
      }

      const settings = settingsRes.data;
      const localDrill = loadDrillLocal(userId);

      set({
        lessonProgress,
        unlockedAchievements: settings?.unlocked_achievements ?? [],
        streak: settings?.streak ?? 0,
        lastActiveDate: settings?.last_active_date ?? '',
        drillSessions: localDrill.drillSessions,
        questionHistory: localDrill.questionHistory,
        loading: false,
        error: null,
      });
    } catch {
      set({
        lessonProgress: {},
        unlockedAchievements: [],
        streak: 0,
        lastActiveDate: '',
        drillSessions: [],
        questionHistory: {},
        loading: false,
        error: 'Unable to load progress right now.',
      });
    }
  },

  startLesson: (lessonId: string) => {
    set((state) => {
      if (state.lessonProgress[lessonId]) return state;
      return {
        lessonProgress: {
          ...state.lessonProgress,
          [lessonId]: {
            lessonId,
            completed: false,
            sectionsCompleted: [],
            quizScore: null,
            quizAttempts: 0,
            startedAt: Date.now(),
            completedAt: null,
          },
        },
      };
    });
    get().updateStreak();
    scheduleLessonSync(lessonId, get, set);
  },

  completeSection: (lessonId: string, sectionId: string) => {
    set((state) => {
      const existing = state.lessonProgress[lessonId];
      if (!existing) return state;
      if (existing.sectionsCompleted.includes(sectionId)) return state;
      return {
        lessonProgress: {
          ...state.lessonProgress,
          [lessonId]: {
            ...existing,
            sectionsCompleted: [...existing.sectionsCompleted, sectionId],
          },
        },
      };
    });
    get().updateStreak();
    checkAchievements(get, set);
    scheduleLessonSync(lessonId, get, set);
  },

  submitQuiz: (lessonId: string, score: number, totalQuestions: number) => {
    const pct = Math.round((score / totalQuestions) * 100);
    set((state) => {
      const existing = state.lessonProgress[lessonId];
      if (!existing) return state;
      const isComplete = pct >= 70;
      return {
        lessonProgress: {
          ...state.lessonProgress,
          [lessonId]: {
            ...existing,
            quizScore: pct,
            quizAttempts: existing.quizAttempts + 1,
            completed: isComplete,
            completedAt: isComplete ? Date.now() : existing.completedAt,
          },
        },
      };
    });
    get().updateStreak();
    checkAchievements(get, set);
    scheduleLessonSync(lessonId, get, set);
  },

  getLessonProgress: (lessonId: string) => {
    return get().lessonProgress[lessonId];
  },

  getCompletedCount: () => {
    return Object.values(get().lessonProgress).filter((p) => p.completed).length;
  },

  getTotalQuizAverage: () => {
    const scores = Object.values(get().lessonProgress)
      .map((p) => p.quizScore)
      .filter((s): s is number => s !== null);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  },

  updateStreak: () => {
    set((state) => {
      const today = todayStr();
      if (state.lastActiveDate === today) return state;
      const yesterday = yesterdayStr();
      const newStreak = state.lastActiveDate === yesterday ? state.streak + 1 : 1;
      return { streak: newStreak, lastActiveDate: today };
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

    // Persist synchronously after state update — localStorage.setItem is sync,
    // so no data is lost if the app crashes between set() and persist.
    getCurrentUserId().then((userId) => {
      if (!userId) return;
      saveDrillLocal(userId, nextSessions, nextHistory);
    });
  },

  resetProgress: async () => {
    const userId = await getCurrentUserId();
    if (userId) {
      localStorage.removeItem(drillKey(userId));
      const [lessonDeleteRes, settingsResetRes] = await Promise.all([
        supabase.from('lesson_progress').delete().eq('user_id', userId),
        supabase.from('user_settings').update({
          unlocked_achievements: [],
          streak: 0,
          last_active_date: null,
          updated_at: new Date().toISOString(),
        }).eq('user_id', userId),
      ]);
      if (lessonDeleteRes.error || settingsResetRes.error) {
        throw new Error('Progress reset failed');
      }
    }
    set({
      lessonProgress: {},
      unlockedAchievements: [],
      streak: 0,
      lastActiveDate: '',
      drillSessions: [],
      questionHistory: {},
      error: null,
    });
  },

  clearLocal: () => {
    set({
      lessonProgress: {},
      unlockedAchievements: [],
      streak: 0,
      lastActiveDate: '',
      drillSessions: [],
      questionHistory: {},
      loading: false,
      error: null,
    });
  },
}));

function checkAchievements(
  get: () => ProgressState,
  set: (fn: (state: ProgressState) => Partial<ProgressState>) => void,
) {
  const state = get();
  const newlyUnlocked: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (state.unlockedAchievements.includes(achievement.id)) continue;

    let earned = false;
    const completedCount = Object.values(state.lessonProgress).filter((p) => p.completed).length;
    const quizScores = Object.values(state.lessonProgress)
      .map((p) => p.quizScore)
      .filter((s): s is number => s !== null);

    switch (achievement.id) {
      case 'first-lesson':
        earned = completedCount >= 1;
        break;
      case 'three-lessons':
        earned = completedCount >= 3;
        break;
      case 'all-lessons':
        earned = completedCount >= ALL_LESSONS.length;
        break;
      case 'perfect-quiz':
        earned = quizScores.some((s) => s === 100);
        break;
      case 'quiz-master':
        earned = quizScores.length >= 3 && quizScores.every((s) => s >= 80);
        break;
      case 'week-streak':
        earned = state.streak >= 7;
        break;
      case 'first-steps':
        earned = Object.keys(state.lessonProgress).length >= 1;
        break;
    }

    if (earned) newlyUnlocked.push(achievement.id);
  }

  if (newlyUnlocked.length > 0) {
    set((state) => ({
      unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
    }));
  }
}
