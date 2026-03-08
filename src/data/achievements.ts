import type { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Started your first lesson',
    icon: '🌱',
  },
  {
    id: 'first-lesson',
    title: 'Seedling',
    description: 'Completed your first lesson',
    icon: '🌿',
  },
  {
    id: 'three-lessons',
    title: 'Growing Strong',
    description: 'Completed 3 lessons',
    icon: '🌳',
  },
  {
    id: 'all-lessons',
    title: 'Master Botanist',
    description: 'Completed all lessons',
    icon: '🏆',
  },
  {
    id: 'perfect-quiz',
    title: 'Perfect Score',
    description: 'Scored 100% on a quiz',
    icon: '⭐',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Scored 80%+ on 3 quizzes',
    icon: '🎓',
  },
  {
    id: 'week-streak',
    title: 'Dedicated Learner',
    description: 'Maintained a 7-day streak',
    icon: '🔥',
  },
];
