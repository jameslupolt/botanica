import type {
  DrillQuestionHistory,
  DrillQuestionRef,
  DrillSessionSettings,
  Lesson,
  Module,
  QuizQuestionType,
} from '../types';

export function getEligibleModules(
  modules: Module[],
  lessonProgress: Record<string, { completed: boolean }>,
): Module[] {
  return modules.filter((mod) => mod.lessonIds.length > 0 && mod.lessonIds.every((id) => lessonProgress[id]?.completed));
}

export function buildDrillPool(
  modules: Module[],
  lessons: Lesson[],
  questionTypes: QuizQuestionType[],
): DrillQuestionRef[] {
  const moduleByLessonId = new Map<string, Module>();
  for (const mod of modules) {
    for (const lessonId of mod.lessonIds) {
      moduleByLessonId.set(lessonId, mod);
    }
  }

  const pool: DrillQuestionRef[] = [];
  for (const lesson of lessons) {
    const mod = moduleByLessonId.get(lesson.id);
    if (!mod) continue;
    for (const question of lesson.quiz.questions) {
      if (!questionTypes.includes(question.type)) continue;
      pool.push({
        key: `${lesson.id}:${question.id}`,
        moduleId: mod.id,
        moduleTitle: mod.title,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        questionId: question.id,
        type: question.type,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      });
    }
  }

  return pool;
}

function getWeight(item: DrillQuestionRef, history: Record<string, DrillQuestionHistory>): number {
  const h = history[item.key];
  if (!h) return 1.5;
  const missRate = h.attempts > 0 ? (h.attempts - h.correct) / h.attempts : 0;
  return 1 + missRate * 2 + Math.min(h.missStreak, 3) * 0.3;
}

function weightedPickIndex(items: DrillQuestionRef[], history: Record<string, DrillQuestionHistory>): number {
  const weights = items.map((i) => getWeight(i, history));
  const sum = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * sum;
  for (let i = 0; i < items.length; i += 1) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return items.length - 1;
}

export function generateSession(
  pool: DrillQuestionRef[],
  settings: DrillSessionSettings,
  history: Record<string, DrillQuestionHistory>,
): DrillQuestionRef[] {
  if (pool.length === 0) return [];

  const target = Math.min(settings.questionCount, pool.length);
  const moduleCaps = new Map<string, number>();
  const maxPerModule = Math.max(1, Math.ceil(target * 0.4));
  const remaining = [...pool];
  const selected: DrillQuestionRef[] = [];

  while (selected.length < target && remaining.length > 0) {
    const idx = weightedPickIndex(remaining, history);
    const candidate = remaining[idx];
    const used = moduleCaps.get(candidate.moduleId) ?? 0;
    if (used < maxPerModule || remaining.length <= target - selected.length) {
      selected.push(candidate);
      moduleCaps.set(candidate.moduleId, used + 1);
    }
    remaining.splice(idx, 1);
  }

  return selected;
}

export function scoreSession(
  questions: DrillQuestionRef[],
  answers: Array<number | number[] | null>,
): { correctAnswers: number; totalQuestions: number; accuracy: number } {
  let correctAnswers = 0;

  for (let i = 0; i < questions.length; i += 1) {
    const q = questions[i];
    const answer = answers[i];
    const expected = q.correctAnswer;

    const isCorrect =
      Array.isArray(expected) && Array.isArray(answer)
        ? expected.length === answer.length && expected.every((v, idx) => v === answer[idx])
        : !Array.isArray(expected) && !Array.isArray(answer) && answer === expected;

    if (isCorrect) correctAnswers += 1;
  }

  const totalQuestions = questions.length;
  const accuracy = totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);
  return { correctAnswers, totalQuestions, accuracy };
}
