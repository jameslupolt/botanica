import { describe, it, expect, beforeEach } from 'vitest';
import { useAchievementStore } from './achievementStore';
import { TOTAL_LESSON_COUNT } from '../data/lesson-meta';

// ── Tests ────────────────────────────────────────────────────────

describe('achievementStore', () => {
  beforeEach(() => {
    useAchievementStore.setState({ unlockedAchievements: [] });
  });

  describe('checkAndUnlock', () => {
    it('unlocks first-lesson when completedCount >= 1', () => {
      useAchievementStore.getState().checkAndUnlock(1, 0, [], 0);
      expect(useAchievementStore.getState().unlockedAchievements).toContain('first-lesson');
    });

    it('does NOT unlock first-lesson when completedCount is 0', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [], 0);
      expect(useAchievementStore.getState().unlockedAchievements).not.toContain('first-lesson');
    });

    it('unlocks three-lessons when completedCount >= 3', () => {
      useAchievementStore.getState().checkAndUnlock(3, 0, [], 0);
      expect(useAchievementStore.getState().unlockedAchievements).toContain('three-lessons');
    });

    it('does NOT unlock three-lessons when completedCount is 2', () => {
      useAchievementStore.getState().checkAndUnlock(2, 0, [], 0);
      expect(useAchievementStore.getState().unlockedAchievements).not.toContain('three-lessons');
    });

    it('unlocks all-lessons when completedCount >= TOTAL_LESSON_COUNT', () => {
      useAchievementStore.getState().checkAndUnlock(TOTAL_LESSON_COUNT, 0, [], 0);
      expect(useAchievementStore.getState().unlockedAchievements).toContain('all-lessons');
    });

    it('does NOT unlock all-lessons when completedCount < TOTAL_LESSON_COUNT', () => {
      useAchievementStore.getState().checkAndUnlock(TOTAL_LESSON_COUNT - 1, 0, [], 0);
      expect(useAchievementStore.getState().unlockedAchievements).not.toContain('all-lessons');
    });

    it('unlocks perfect-quiz when quizScores contains 100', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [80, 100, 75], 0);
      expect(useAchievementStore.getState().unlockedAchievements).toContain('perfect-quiz');
    });

    it('does NOT unlock perfect-quiz when no score is 100', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [80, 99, 75], 0);
      expect(useAchievementStore.getState().unlockedAchievements).not.toContain('perfect-quiz');
    });

    it('unlocks quiz-master when 3+ scores are all >= 80', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [80, 85, 90], 0);
      expect(useAchievementStore.getState().unlockedAchievements).toContain('quiz-master');
    });

    it('does NOT unlock quiz-master when fewer than 3 scores', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [80, 90], 0);
      expect(useAchievementStore.getState().unlockedAchievements).not.toContain('quiz-master');
    });

    it('does NOT unlock quiz-master when any score is below 80', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [80, 79, 90], 0);
      expect(useAchievementStore.getState().unlockedAchievements).not.toContain('quiz-master');
    });

    it('unlocks week-streak when streak >= 7', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [], 7);
      expect(useAchievementStore.getState().unlockedAchievements).toContain('week-streak');
    });

    it('does NOT unlock week-streak when streak is 6', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [], 6);
      expect(useAchievementStore.getState().unlockedAchievements).not.toContain('week-streak');
    });

    it('unlocks first-steps when startedCount >= 1', () => {
      useAchievementStore.getState().checkAndUnlock(0, 1, [], 0);
      expect(useAchievementStore.getState().unlockedAchievements).toContain('first-steps');
    });

    it('does NOT unlock first-steps when startedCount is 0', () => {
      useAchievementStore.getState().checkAndUnlock(0, 0, [], 0);
      expect(useAchievementStore.getState().unlockedAchievements).not.toContain('first-steps');
    });

    it('does NOT re-add already-unlocked achievements', () => {
      // Unlock first-lesson once
      useAchievementStore.getState().checkAndUnlock(1, 0, [], 0);
      // Call again
      useAchievementStore.getState().checkAndUnlock(1, 0, [], 0);

      const { unlockedAchievements } = useAchievementStore.getState();
      const firstLessonOccurrences = unlockedAchievements.filter((id) => id === 'first-lesson');
      expect(firstLessonOccurrences).toHaveLength(1);
    });

    it('can unlock multiple achievements in a single call', () => {
      useAchievementStore.getState().checkAndUnlock(3, 1, [100], 7);
      const { unlockedAchievements } = useAchievementStore.getState();
      expect(unlockedAchievements).toContain('first-steps');
      expect(unlockedAchievements).toContain('first-lesson');
      expect(unlockedAchievements).toContain('three-lessons');
      expect(unlockedAchievements).toContain('perfect-quiz');
      expect(unlockedAchievements).toContain('week-streak');
    });
  });

  describe('clearAchievements', () => {
    it('resets unlockedAchievements to empty array', () => {
      useAchievementStore.setState({ unlockedAchievements: ['first-lesson', 'three-lessons'] });
      useAchievementStore.getState().clearAchievements();
      expect(useAchievementStore.getState().unlockedAchievements).toEqual([]);
    });

    it('is idempotent on empty state', () => {
      useAchievementStore.getState().clearAchievements();
      expect(useAchievementStore.getState().unlockedAchievements).toEqual([]);
    });
  });
});
