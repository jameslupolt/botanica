import { create } from 'zustand';
import type { LessonProgress } from '../types';
import { supabase } from '../lib/supabase';
import { useAchievementStore } from './achievementStore';
import { useDrillStore } from './drillStore';

interface ProgressState {
  lessonProgress: Record<string, LessonProgress>;
  streak: number;
  lastActiveDate: string;
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
  resetProgress: () => Promise<void>;
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
          unlocked_achievements: useAchievementStore.getState().unlockedAchievements,
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
  streak: 0,
  lastActiveDate: '',
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
      useAchievementStore.setState({ unlockedAchievements: settings?.unlocked_achievements ?? [] });

      set({
        lessonProgress,
        streak: settings?.streak ?? 0,
        lastActiveDate: settings?.last_active_date ?? '',
        loading: false,
        error: null,
      });
    } catch {
      useAchievementStore.setState({ unlockedAchievements: [] });
      set({
        lessonProgress: {},
        streak: 0,
        lastActiveDate: '',
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
    updateAchievementProgress(get);
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
    updateAchievementProgress(get);
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
    updateAchievementProgress(get);
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

  resetProgress: async () => {
    const userId = await getCurrentUserId();
    if (userId) {
      const [lessonDeleteRes, settingsResetRes] = await Promise.all([
        supabase.from('lesson_progress').delete().eq('user_id', userId),
        supabase
          .from('user_settings')
          .update({
            unlocked_achievements: [],
            streak: 0,
            last_active_date: null,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId),
      ]);
      if (lessonDeleteRes.error || settingsResetRes.error) {
        throw new Error('Progress reset failed');
      }
    }
    useDrillStore.getState().clearDrill();
    useAchievementStore.getState().clearAchievements();
    set({
      lessonProgress: {},
      streak: 0,
      lastActiveDate: '',
      error: null,
    });
  },

  clearLocal: () => {
    set({
      lessonProgress: {},
      streak: 0,
      lastActiveDate: '',
      loading: false,
      error: null,
    });
  },
}));

function updateAchievementProgress(get: () => ProgressState) {
  const state = get();
  const completedCount = Object.values(state.lessonProgress).filter((p) => p.completed).length;
  const startedCount = Object.keys(state.lessonProgress).length;
  const quizScores = Object.values(state.lessonProgress)
    .map((p) => p.quizScore)
    .filter((s): s is number => s !== null);
  useAchievementStore.getState().checkAndUnlock(completedCount, startedCount, quizScores, state.streak);
}
