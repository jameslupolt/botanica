import { describe, it, expect } from 'vitest';
import {
  getEligibleModules,
  buildDrillPool,
  generateSession,
  scoreSession,
} from './drill';
import type {
  Module,
  Lesson,
  DrillQuestionHistory,
  DrillSessionSettings,
  DrillQuestionRef,
} from '../types';

// ── Helpers ──────────────────────────────────────────────────────

function makeModule(overrides: Partial<Module> = {}): Module {
  return {
    id: 'mod-1',
    title: 'Test Module',
    slug: 'test-module',
    description: '',
    icon: '🌱',
    color: 'leaf',
    order: 1,
    lessonIds: ['lesson-1', 'lesson-2'],
    ...overrides,
  };
}

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    id: 'lesson-1',
    title: 'Test Lesson',
    slug: 'test-lesson',
    description: '',
    category: 'anatomy',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    icon: '🔬',
    color: 'leaf',
    sections: [],
    quiz: {
      id: 'quiz-1',
      title: 'Test Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'What is a cell?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'A is correct',
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'Plants are green',
          options: ['True', 'False'],
          correctAnswer: 0,
          explanation: 'True',
        },
      ],
    },
    prerequisites: [],
    order: 1,
    ...overrides,
  };
}

function makeRef(overrides: Partial<DrillQuestionRef> = {}): DrillQuestionRef {
  return {
    key: 'lesson-1:q1',
    moduleId: 'mod-1',
    moduleTitle: 'Test Module',
    lessonId: 'lesson-1',
    lessonTitle: 'Test Lesson',
    questionId: 'q1',
    type: 'multiple-choice',
    question: 'What is a cell?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A is correct',
    ...overrides,
  };
}

// ── getEligibleModules ───────────────────────────────────────────

describe('getEligibleModules', () => {
  it('returns modules where all lessons are completed', () => {
    const modules = [makeModule()];
    const progress = {
      'lesson-1': { completed: true },
      'lesson-2': { completed: true },
    };
    expect(getEligibleModules(modules, progress)).toEqual(modules);
  });

  it('excludes modules with incomplete lessons', () => {
    const modules = [makeModule()];
    const progress = {
      'lesson-1': { completed: true },
      'lesson-2': { completed: false },
    };
    expect(getEligibleModules(modules, progress)).toEqual([]);
  });

  it('excludes modules with no lessons', () => {
    const modules = [makeModule({ lessonIds: [] })];
    expect(getEligibleModules(modules, {})).toEqual([]);
  });

  it('excludes modules with missing progress entries', () => {
    const modules = [makeModule()];
    const progress = { 'lesson-1': { completed: true } };
    expect(getEligibleModules(modules, progress)).toEqual([]);
  });

  it('handles multiple modules independently', () => {
    const mod1 = makeModule({ id: 'mod-1', lessonIds: ['a'] });
    const mod2 = makeModule({ id: 'mod-2', lessonIds: ['b'] });
    const progress = {
      a: { completed: true },
      b: { completed: false },
    };
    const result = getEligibleModules([mod1, mod2], progress);
    expect(result).toEqual([mod1]);
  });
});

// ── buildDrillPool ───────────────────────────────────────────────

describe('buildDrillPool', () => {
  it('builds pool from modules and matching lessons', () => {
    const modules = [makeModule({ lessonIds: ['lesson-1'] })];
    const lessons = [makeLesson()];
    const pool = buildDrillPool(modules, lessons, ['multiple-choice', 'true-false']);
    expect(pool).toHaveLength(2);
    expect(pool[0].key).toBe('lesson-1:q1');
    expect(pool[1].key).toBe('lesson-1:q2');
  });

  it('filters by question type', () => {
    const modules = [makeModule({ lessonIds: ['lesson-1'] })];
    const lessons = [makeLesson()];
    const pool = buildDrillPool(modules, lessons, ['true-false']);
    expect(pool).toHaveLength(1);
    expect(pool[0].type).toBe('true-false');
  });

  it('excludes lessons not belonging to any module', () => {
    const modules = [makeModule({ lessonIds: ['lesson-99'] })];
    const lessons = [makeLesson({ id: 'lesson-1' })];
    const pool = buildDrillPool(modules, lessons, ['multiple-choice']);
    expect(pool).toHaveLength(0);
  });

  it('returns empty pool for empty inputs', () => {
    expect(buildDrillPool([], [], ['multiple-choice'])).toEqual([]);
  });
});

// ── generateSession ──────────────────────────────────────────────

describe('generateSession', () => {
  const settings: DrillSessionSettings = {
    moduleIds: ['mod-1'],
    questionCount: 5,
    questionTypes: ['multiple-choice'],
    immediateFeedback: false,
  };

  it('returns empty array for empty pool', () => {
    expect(generateSession([], settings, {})).toEqual([]);
  });

  it('does not exceed requested question count', () => {
    const pool = Array.from({ length: 20 }, (_, i) =>
      makeRef({ key: `l:q${i}`, questionId: `q${i}` }),
    );
    const session = generateSession(pool, settings, {});
    expect(session.length).toBe(5);
  });

  it('returns all questions when pool is smaller than requested count', () => {
    const pool = [makeRef(), makeRef({ key: 'l:q2', questionId: 'q2' })];
    const session = generateSession(pool, { ...settings, questionCount: 10 }, {});
    expect(session.length).toBe(2);
  });

  it('does not duplicate questions', () => {
    const pool = Array.from({ length: 10 }, (_, i) =>
      makeRef({ key: `l:q${i}`, questionId: `q${i}` }),
    );
    const session = generateSession(pool, { ...settings, questionCount: 10 }, {});
    const keys = session.map((q) => q.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('weights toward missed questions', () => {
    const easy = makeRef({ key: 'l:easy', questionId: 'easy' });
    const hard = makeRef({ key: 'l:hard', questionId: 'hard' });
    const pool = [easy, hard];
    const history: Record<string, DrillQuestionHistory> = {
      'l:easy': { attempts: 10, correct: 10, missStreak: 0, lastSeen: Date.now() },
      'l:hard': { attempts: 10, correct: 0, missStreak: 10, lastSeen: Date.now() },
    };

    // Run many sessions and count how often "hard" appears first
    let hardFirst = 0;
    for (let i = 0; i < 200; i++) {
      const session = generateSession([...pool], { ...settings, questionCount: 1 }, history);
      if (session[0]?.key === 'l:hard') hardFirst++;
    }
    // hard question should be picked significantly more often (weight ~3.9 vs ~1.0)
    expect(hardFirst).toBeGreaterThan(120);
  });

  it('distributes questions across modules rather than concentrating', () => {
    // With 3 modules of 20 questions each, requesting 10, the cap mechanism
    // should prevent any single module from taking all 10 slots.
    const pool = [
      ...Array.from({ length: 20 }, (_, i) =>
        makeRef({ key: `l:a${i}`, questionId: `a${i}`, moduleId: 'mod-a' }),
      ),
      ...Array.from({ length: 20 }, (_, i) =>
        makeRef({ key: `l:b${i}`, questionId: `b${i}`, moduleId: 'mod-b' }),
      ),
      ...Array.from({ length: 20 }, (_, i) =>
        makeRef({ key: `l:c${i}`, questionId: `c${i}`, moduleId: 'mod-c' }),
      ),
    ];
    // Run multiple times to account for randomness
    for (let trial = 0; trial < 20; trial++) {
      const session = generateSession([...pool], { ...settings, questionCount: 10 }, {});
      expect(session.length).toBe(10);
      const modACnt = session.filter((q) => q.moduleId === 'mod-a').length;
      const modBCnt = session.filter((q) => q.moduleId === 'mod-b').length;
      const modCCnt = session.filter((q) => q.moduleId === 'mod-c').length;
      // maxPerModule = ceil(10 * 0.4) = 4 — no module should exceed this
      expect(modACnt).toBeLessThanOrEqual(4);
      expect(modBCnt).toBeLessThanOrEqual(4);
      expect(modCCnt).toBeLessThanOrEqual(4);
    }
  });
});

// ── scoreSession ─────────────────────────────────────────────────

describe('scoreSession', () => {
  it('scores all correct answers', () => {
    const questions = [
      makeRef({ correctAnswer: 0 }),
      makeRef({ key: 'l:q2', correctAnswer: 1 }),
    ];
    const answers = [0, 1];
    const result = scoreSession(questions, answers);
    expect(result).toEqual({ correctAnswers: 2, totalQuestions: 2, accuracy: 100 });
  });

  it('scores all wrong answers', () => {
    const questions = [makeRef({ correctAnswer: 0 })];
    const answers = [2];
    const result = scoreSession(questions, answers);
    expect(result).toEqual({ correctAnswers: 0, totalQuestions: 1, accuracy: 0 });
  });

  it('handles null answers as incorrect', () => {
    const questions = [makeRef({ correctAnswer: 0 })];
    const answers = [null];
    const result = scoreSession(questions, answers);
    expect(result.correctAnswers).toBe(0);
  });

  it('handles ordering questions (array answers)', () => {
    const questions = [makeRef({ correctAnswer: [0, 1, 2], type: 'ordering' })];
    expect(scoreSession(questions, [[0, 1, 2]]).correctAnswers).toBe(1);
    expect(scoreSession(questions, [[2, 1, 0]]).correctAnswers).toBe(0);
  });

  it('rejects array answer with wrong length', () => {
    const questions = [makeRef({ correctAnswer: [0, 1, 2], type: 'ordering' })];
    expect(scoreSession(questions, [[0, 1]]).correctAnswers).toBe(0);
  });

  it('returns 0 accuracy for empty session', () => {
    expect(scoreSession([], []).accuracy).toBe(0);
  });

  it('rounds accuracy to nearest integer', () => {
    const questions = [
      makeRef({ correctAnswer: 0 }),
      makeRef({ key: 'l:q2', correctAnswer: 1 }),
      makeRef({ key: 'l:q3', correctAnswer: 2 }),
    ];
    const answers = [0, 99, 99]; // 1 of 3 correct
    const result = scoreSession(questions, answers);
    expect(result.accuracy).toBe(33); // 33.33 rounds to 33
  });
});
