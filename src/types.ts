// ── Content Blocks ──────────────────────────────────────────────

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; title: string; text: string; variant: 'info' | 'warning' | 'tip' | 'fact' }
  | { type: 'key-term'; term: string; definition: string }
  | { type: 'regional-example'; prompt: string; taxonId?: number };

// ── Lessons ─────────────────────────────────────────────────────

export type LessonCategory =
  | 'anatomy'
  | 'physiology'
  | 'taxonomy'
  | 'ecology'
  | 'reproduction';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LessonSection {
  id: string;
  title: string;
  content: ContentBlock[];
}

export type QuizQuestionType = 'multiple-choice' | 'true-false' | 'ordering';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: LessonCategory;
  difficulty: Difficulty;
  estimatedMinutes: number;
  icon: string;
  color: string;
  sections: LessonSection[];
  quiz: Quiz;
  prerequisites: string[];
  order: number;
}

// ── Progress ────────────────────────────────────────────────────

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  sectionsCompleted: string[];
  quizScore: number | null;
  quizAttempts: number;
  startedAt: number;
  completedAt: number | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface UserProgress {
  lessonProgress: Record<string, LessonProgress>;
  unlockedAchievements: string[];
  streak: number;
  lastActiveDate: string;
}

export interface DrillQuestionRef {
  key: string;
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  questionId: string;
  type: QuizQuestionType;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
}

export interface DrillSessionSettings {
  moduleIds: string[];
  questionCount: number;
  questionTypes: QuizQuestionType[];
  immediateFeedback: boolean;
}

export interface DrillQuestionAttempt {
  key: string;
  moduleId: string;
  lessonId: string;
  questionId: string;
  selectedAnswer: number | number[] | null;
  correct: boolean;
  responseTimeMs: number;
}

export interface DrillSessionRecord {
  id: string;
  startedAt: number;
  completedAt: number;
  settings: DrillSessionSettings;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  attempts: DrillQuestionAttempt[];
}

export interface DrillQuestionHistory {
  attempts: number;
  correct: number;
  missStreak: number;
  lastSeen: number;
}

// ── Modules ────────────────────────────────────────────────────

export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  lessonIds: string[];
}

// ── Category metadata ───────────────────────────────────────────

export const CATEGORY_META: Record<LessonCategory, { label: string; icon: string; color: string }> = {
  anatomy: { label: 'Plant Anatomy', icon: '🔬', color: 'leaf' },
  physiology: { label: 'Plant Physiology', icon: '⚡', color: 'sky' },
  taxonomy: { label: 'Taxonomy', icon: '📚', color: 'bark' },
  ecology: { label: 'Ecology', icon: '🌍', color: 'leaf' },
  reproduction: { label: 'Reproduction', icon: '🌸', color: 'petal' },
};

export const DIFFICULTY_META: Record<Difficulty, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: 'text-leaf-600 bg-leaf-100' },
  intermediate: { label: 'Intermediate', color: 'text-sky-600 bg-sky-100' },
  advanced: { label: 'Advanced', color: 'text-petal-600 bg-petal-100' },
};
