import { describe, it, expect } from 'vitest';
import { ALL_LESSONS, getLessonById, getLessonBySlug, getLessonsByCategory, searchLessons } from './index';
import { ALL_MODULES, getModuleBySlug, getModuleForLesson, getModuleProgress } from './modules';
import type { LessonCategory } from '../types';

// ── Lesson Data Integrity ────────────────────────────────────────

describe('lesson data integrity', () => {
  it('has no duplicate lesson IDs', () => {
    const ids = ALL_LESSONS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no duplicate lesson slugs', () => {
    const slugs = ALL_LESSONS.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every lesson has at least one section', () => {
    for (const lesson of ALL_LESSONS) {
      expect(lesson.sections.length, `${lesson.id} has no sections`).toBeGreaterThan(0);
    }
  });

  it('every lesson has at least one quiz question', () => {
    for (const lesson of ALL_LESSONS) {
      expect(
        lesson.quiz.questions.length,
        `${lesson.id} has no quiz questions`,
      ).toBeGreaterThan(0);
    }
  });

  it('every quiz question has a valid correctAnswer index', () => {
    for (const lesson of ALL_LESSONS) {
      for (const q of lesson.quiz.questions) {
        if (typeof q.correctAnswer === 'number') {
          expect(
            q.correctAnswer,
            `${lesson.id}:${q.id} correctAnswer out of range`,
          ).toBeLessThan(q.options.length);
          expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        } else {
          // ordering: every index should be valid
          for (const idx of q.correctAnswer) {
            expect(
              idx,
              `${lesson.id}:${q.id} ordering index out of range`,
            ).toBeLessThan(q.options.length);
            expect(idx).toBeGreaterThanOrEqual(0);
          }
        }
      }
    }
  });

  it('every lesson has valid category', () => {
    const validCategories: LessonCategory[] = [
      'anatomy', 'physiology', 'taxonomy', 'ecology', 'reproduction',
    ];
    for (const lesson of ALL_LESSONS) {
      expect(
        validCategories,
        `${lesson.id} has invalid category "${lesson.category}"`,
      ).toContain(lesson.category);
    }
  });

  it('every lesson has valid difficulty', () => {
    const valid = ['beginner', 'intermediate', 'advanced'];
    for (const lesson of ALL_LESSONS) {
      expect(valid, `${lesson.id} invalid difficulty`).toContain(lesson.difficulty);
    }
  });

  it('every quiz question has non-empty explanation', () => {
    for (const lesson of ALL_LESSONS) {
      for (const q of lesson.quiz.questions) {
        expect(
          q.explanation.trim().length,
          `${lesson.id}:${q.id} has empty explanation`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it('every quiz question has non-empty question text', () => {
    for (const lesson of ALL_LESSONS) {
      for (const q of lesson.quiz.questions) {
        expect(
          q.question.trim().length,
          `${lesson.id}:${q.id} has empty question`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it('no quiz question has fewer than 2 options', () => {
    for (const lesson of ALL_LESSONS) {
      for (const q of lesson.quiz.questions) {
        expect(
          q.options.length,
          `${lesson.id}:${q.id} has fewer than 2 options`,
        ).toBeGreaterThanOrEqual(2);
      }
    }
  });
});

// ── Module Data Integrity ────────────────────────────────────────

describe('module data integrity', () => {
  it('has no duplicate module IDs', () => {
    const ids = ALL_MODULES.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no duplicate module slugs', () => {
    const slugs = ALL_MODULES.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every module lesson ID references an existing lesson', () => {
    for (const mod of ALL_MODULES) {
      for (const lessonId of mod.lessonIds) {
        expect(
          getLessonById(lessonId),
          `Module "${mod.id}" references missing lesson "${lessonId}"`,
        ).toBeDefined();
      }
    }
  });

  it('every lesson belongs to at least one module', () => {
    const moduleLessonIds = new Set(ALL_MODULES.flatMap((m) => m.lessonIds));
    for (const lesson of ALL_LESSONS) {
      expect(
        moduleLessonIds.has(lesson.id),
        `Lesson "${lesson.id}" is not in any module`,
      ).toBe(true);
    }
  });

  it('no lesson appears in multiple modules', () => {
    const seen = new Map<string, string>();
    for (const mod of ALL_MODULES) {
      for (const lessonId of mod.lessonIds) {
        const prev = seen.get(lessonId);
        expect(
          prev,
          `Lesson "${lessonId}" appears in both "${prev}" and "${mod.id}"`,
        ).toBeUndefined();
        seen.set(lessonId, mod.id);
      }
    }
  });

  it('modules are sorted by order', () => {
    for (let i = 1; i < ALL_MODULES.length; i++) {
      expect(ALL_MODULES[i].order).toBeGreaterThanOrEqual(ALL_MODULES[i - 1].order);
    }
  });
});

// ── Lookup Functions ─────────────────────────────────────────────

describe('lookup functions', () => {
  it('getLessonById returns correct lesson', () => {
    const lesson = ALL_LESSONS[0];
    expect(getLessonById(lesson.id)?.id).toBe(lesson.id);
  });

  it('getLessonById returns undefined for missing ID', () => {
    expect(getLessonById('nonexistent')).toBeUndefined();
  });

  it('getLessonBySlug returns correct lesson', () => {
    const lesson = ALL_LESSONS[0];
    expect(getLessonBySlug(lesson.slug)?.slug).toBe(lesson.slug);
  });

  it('getLessonsByCategory returns only matching lessons', () => {
    const results = getLessonsByCategory('anatomy');
    expect(results.length).toBeGreaterThan(0);
    for (const l of results) {
      expect(l.category).toBe('anatomy');
    }
  });

  it('searchLessons matches title', () => {
    const lesson = ALL_LESSONS[0];
    const word = lesson.title.split(' ')[0];
    const results = searchLessons(word);
    expect(results.some((l) => l.id === lesson.id)).toBe(true);
  });

  it('searchLessons is case-insensitive', () => {
    const results = searchLessons('PHOTO');
    expect(results.length).toBeGreaterThan(0);
  });

  it('getModuleBySlug returns correct module', () => {
    const mod = ALL_MODULES[0];
    expect(getModuleBySlug(mod.slug)?.id).toBe(mod.id);
  });

  it('getModuleForLesson returns the module containing the lesson', () => {
    const mod = ALL_MODULES[0];
    const lessonId = mod.lessonIds[0];
    expect(getModuleForLesson(lessonId)?.id).toBe(mod.id);
  });

  it('getModuleForLesson returns undefined for orphan lesson', () => {
    expect(getModuleForLesson('nonexistent')).toBeUndefined();
  });
});

// ── getModuleProgress ────────────────────────────────────────────

describe('getModuleProgress', () => {
  it('calculates progress correctly', () => {
    const mod = ALL_MODULES[0];
    const progress: Record<string, { completed: boolean }> = {};
    for (const id of mod.lessonIds) {
      progress[id] = { completed: false };
    }
    progress[mod.lessonIds[0]] = { completed: true };

    const result = getModuleProgress(mod, progress);
    expect(result.total).toBe(mod.lessonIds.length);
    expect(result.completed).toBe(1);
    expect(result.percent).toBe(Math.round((1 / mod.lessonIds.length) * 100));
  });

  it('returns 0% with no progress', () => {
    const mod = ALL_MODULES[0];
    const result = getModuleProgress(mod, {});
    expect(result.completed).toBe(0);
    expect(result.percent).toBe(0);
  });

  it('returns 100% when all complete', () => {
    const mod = ALL_MODULES[0];
    const progress: Record<string, { completed: boolean }> = {};
    for (const id of mod.lessonIds) {
      progress[id] = { completed: true };
    }
    const result = getModuleProgress(mod, progress);
    expect(result.percent).toBe(100);
  });
});
