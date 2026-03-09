import { create } from 'zustand';
import { ACHIEVEMENTS } from '../data/achievements';
import { TOTAL_LESSON_COUNT } from '../data/lesson-meta';

interface AchievementState {
  unlockedAchievements: string[];
  checkAndUnlock: (completedCount: number, startedCount: number, quizScores: number[], streak: number) => void;
  clearAchievements: () => void;
}

function checkEarned(id: string, completedCount: number, startedCount: number, quizScores: number[], streak: number): boolean {
  switch (id) {
    case 'first-lesson':
      return completedCount >= 1;
    case 'three-lessons':
      return completedCount >= 3;
    case 'all-lessons':
      return completedCount >= TOTAL_LESSON_COUNT;
    case 'perfect-quiz':
      return quizScores.some((s) => s === 100);
    case 'quiz-master':
      return quizScores.length >= 3 && quizScores.every((s) => s >= 80);
    case 'week-streak':
      return streak >= 7;
    case 'first-steps':
      return startedCount >= 1;
    default:
      return false;
  }
}

export const useAchievementStore = create<AchievementState>()((set, get) => ({
  unlockedAchievements: [],

  checkAndUnlock: (completedCount: number, startedCount: number, quizScores: number[], streak: number) => {
    const unlocked = get().unlockedAchievements;
    const newlyUnlocked: string[] = [];

    for (const achievement of ACHIEVEMENTS) {
      if (unlocked.includes(achievement.id)) continue;
      if (checkEarned(achievement.id, completedCount, startedCount, quizScores, streak)) {
        newlyUnlocked.push(achievement.id);
      }
    }

    if (newlyUnlocked.length > 0) {
      set({ unlockedAchievements: [...unlocked, ...newlyUnlocked] });
    }
  },

  clearAchievements: () => {
    set({ unlockedAchievements: [] });
  },
}));
