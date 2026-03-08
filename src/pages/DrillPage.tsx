import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, RotateCcw, Target, XCircle } from 'lucide-react';
import { ALL_LESSONS } from '../data';
import { ALL_MODULES } from '../data/modules';
import { buildDrillPool, generateSession, getEligibleModules, scoreSession } from '../lib/drill';
import type { DrillQuestionAttempt, DrillQuestionRef, DrillSessionRecord, DrillSessionSettings, QuizQuestionType } from '../types';
import { useProgressStore } from '../store/progressStore';

function createSessionId(): string {
  return `drill_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function isCorrectAnswer(question: DrillQuestionRef, selected: number | number[] | null): boolean {
  const expected = question.correctAnswer;
  if (Array.isArray(expected) && Array.isArray(selected)) {
    return expected.length === selected.length && expected.every((v, idx) => v === selected[idx]);
  }
  if (!Array.isArray(expected) && !Array.isArray(selected)) {
    return selected === expected;
  }
  return false;
}

export function DrillPage() {
  const lessonProgress = useProgressStore((s) => s.lessonProgress);
  const questionHistory = useProgressStore((s) => s.questionHistory);
  const saveDrillSession = useProgressStore((s) => s.saveDrillSession);

  const eligibleModules = useMemo(
    () => getEligibleModules(ALL_MODULES, lessonProgress),
    [lessonProgress],
  );

  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(20);
  const [includeTrueFalse, setIncludeTrueFalse] = useState(true);
  const [immediateFeedback, setImmediateFeedback] = useState(true);

  const [activeQuestions, setActiveQuestions] = useState<DrillQuestionRef[] | null>(null);
  const [settings, setSettings] = useState<DrillSessionSettings | null>(null);
  const [sessionStartAt, setSessionStartAt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionStartAt, setQuestionStartAt] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<DrillQuestionAttempt[]>([]);
  const [reviewCorrect, setReviewCorrect] = useState<boolean | null>(null);
  const [result, setResult] = useState<{ session: DrillSessionRecord; questions: DrillQuestionRef[] } | null>(null);

  useEffect(() => {
    setSelectedModuleIds(eligibleModules.map((m) => m.id));
  }, [eligibleModules]);

  const questionTypes: QuizQuestionType[] = useMemo(() => {
    const types: QuizQuestionType[] = ['multiple-choice'];
    if (includeTrueFalse) types.push('true-false');
    return types;
  }, [includeTrueFalse]);

  const selectedModules = useMemo(
    () => eligibleModules.filter((m) => selectedModuleIds.includes(m.id)),
    [eligibleModules, selectedModuleIds],
  );

  const availablePool = useMemo(
    () => buildDrillPool(selectedModules, ALL_LESSONS, questionTypes),
    [selectedModules, questionTypes],
  );

  const currentQuestion = activeQuestions ? activeQuestions[currentIndex] : null;

  const startDrill = () => {
    if (availablePool.length === 0) return;
    const nextSettings: DrillSessionSettings = {
      moduleIds: selectedModuleIds,
      questionCount,
      questionTypes,
      immediateFeedback,
    };
    const questions = generateSession(availablePool, nextSettings, questionHistory);
    if (questions.length === 0) return;
    const now = Date.now();
    setSettings(nextSettings);
    setActiveQuestions(questions);
    setSessionStartAt(now);
    setQuestionStartAt(now);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAttempts([]);
    setReviewCorrect(null);
    setResult(null);
  };

  const submitCurrentAnswer = () => {
    if (!currentQuestion || selectedAnswer === null) return;
    const now = Date.now();
    const correct = isCorrectAnswer(currentQuestion, selectedAnswer);
    const attempt: DrillQuestionAttempt = {
      key: currentQuestion.key,
      moduleId: currentQuestion.moduleId,
      lessonId: currentQuestion.lessonId,
      questionId: currentQuestion.questionId,
      selectedAnswer,
      correct,
      responseTimeMs: Math.max(0, now - questionStartAt),
    };
    setAttempts((prev) => [...prev, attempt]);

    if (settings?.immediateFeedback) {
      setReviewCorrect(correct);
      return;
    }

    advanceOrFinish([...attempts, attempt]);
  };

  const advanceOrFinish = (allAttempts: DrillQuestionAttempt[]) => {
    if (!activeQuestions || !settings) return;
    const isLast = currentIndex >= activeQuestions.length - 1;
    if (isLast) {
      const answers = allAttempts.map((a) => a.selectedAnswer);
      const scored = scoreSession(activeQuestions, answers);
      const session: DrillSessionRecord = {
        id: createSessionId(),
        startedAt: sessionStartAt,
        completedAt: Date.now(),
        settings,
        totalQuestions: scored.totalQuestions,
        correctAnswers: scored.correctAnswers,
        accuracy: scored.accuracy,
        attempts: allAttempts,
      };
      saveDrillSession(session);
      setResult({ session, questions: activeQuestions });
      setActiveQuestions(null);
      return;
    }

    const now = Date.now();
    setCurrentIndex((i) => i + 1);
    setQuestionStartAt(now);
    setSelectedAnswer(null);
    setReviewCorrect(null);
  };

  const nextAfterReview = () => {
    if (!activeQuestions) return;
    advanceOrFinish(attempts);
  };

  const retryMissed = () => {
    if (!result) return;
    const wrongKeys = new Set(result.session.attempts.filter((a) => !a.correct).map((a) => a.key));
    const missed = result.questions.filter((q) => wrongKeys.has(q.key));
    if (missed.length === 0) return;
    const now = Date.now();
    setSettings({
      moduleIds: result.session.settings.moduleIds,
      questionCount: missed.length,
      questionTypes: result.session.settings.questionTypes,
      immediateFeedback: result.session.settings.immediateFeedback,
    });
    setActiveQuestions(missed);
    setSessionStartAt(now);
    setQuestionStartAt(now);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAttempts([]);
    setReviewCorrect(null);
    setResult(null);
  };

  const resetToSetup = () => {
    setActiveQuestions(null);
    setResult(null);
    setAttempts([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setReviewCorrect(null);
  };

  if (eligibleModules.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-display font-bold text-bark-900">Drill Mode</h1>
        <p className="mt-2 text-bark-600">Complete at least one full module to unlock mixed-module drills.</p>
        <Link to="/browse" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700">
          Browse Modules
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (result) {
    const byModule = new Map<string, { title: string; total: number; correct: number }>();
    for (const attempt of result.session.attempts) {
      const q = result.questions.find((item) => item.key === attempt.key);
      if (!q) continue;
      const row = byModule.get(q.moduleId) ?? { title: q.moduleTitle, total: 0, correct: 0 };
      row.total += 1;
      if (attempt.correct) row.correct += 1;
      byModule.set(q.moduleId, row);
    }

    const missedCount = result.session.attempts.filter((a) => !a.correct).length;

    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-display font-bold text-bark-900">Drill Results</h1>
        <p className="mt-2 text-bark-600">
          Score: <span className="font-semibold text-bark-900">{result.session.correctAnswers}/{result.session.totalQuestions}</span> ({result.session.accuracy}%)
        </p>

        <div className="mt-6 rounded-xl border border-bark-100 bg-white p-4">
          <h2 className="font-semibold text-bark-800">Module Breakdown</h2>
          <div className="mt-3 space-y-2">
            {[...byModule.values()].map((row) => (
              <div key={row.title} className="flex items-center justify-between text-sm">
                <span className="text-bark-700">{row.title}</span>
                <span className="text-bark-600">{row.correct}/{row.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={missedCount === 0}
            onClick={retryMissed}
            className="inline-flex items-center gap-2 rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw className="h-4 w-4" />
            Retry Missed
          </button>
          <button
            type="button"
            onClick={resetToSetup}
            className="rounded-xl border border-bark-200 px-4 py-2.5 text-bark-700 font-medium hover:bg-bark-50"
          >
            New Mixed Drill
          </button>
          <Link
            to="/dashboard"
            className="rounded-xl border border-bark-200 px-4 py-2.5 text-bark-700 font-medium hover:bg-bark-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (activeQuestions && currentQuestion && settings) {
    const progressPct = Math.round(((currentIndex + 1) / activeQuestions.length) * 100);
    const correctIdx = Array.isArray(currentQuestion.correctAnswer) ? null : currentQuestion.correctAnswer;

    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-display font-bold text-bark-900">Drill Mode</h1>
        <p className="mt-2 text-bark-600">
          Question {currentIndex + 1} of {activeQuestions.length} · {currentQuestion.moduleTitle}
        </p>
        <div className="mt-4 h-2 rounded-full bg-bark-100">
          <div className="h-full rounded-full bg-leaf-500" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="mt-6 rounded-xl border border-bark-100 bg-white p-5">
          <p className="text-sm text-bark-500">{currentQuestion.lessonTitle}</p>
          <h2 className="mt-2 text-lg font-semibold text-bark-900">{currentQuestion.question}</h2>
          <div className="mt-4 space-y-2">
            {currentQuestion.options.map((option, idx) => {
              const selected = selectedAnswer === idx;
              const correct = reviewCorrect !== null && correctIdx === idx;
              const incorrectSelected = reviewCorrect !== null && selected && !correct;
              const stateClass = correct
                ? 'border-leaf-400 bg-leaf-50'
                : incorrectSelected
                  ? 'border-petal-400 bg-petal-50'
                  : selected
                    ? 'border-leaf-400 bg-leaf-50'
                    : 'border-bark-200 hover:border-leaf-300';
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={reviewCorrect !== null}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-bark-800 ${stateClass} disabled:cursor-default`}
                >
                  <span className="font-medium mr-2 text-bark-500">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {reviewCorrect !== null && (
            <div className={`mt-4 rounded-xl border p-3 ${reviewCorrect ? 'border-leaf-200 bg-leaf-50' : 'border-petal-200 bg-petal-50'}`}>
              <p className="text-sm font-medium flex items-center gap-2">
                {reviewCorrect ? (
                  <><CheckCircle2 className="h-4 w-4 text-leaf-600" /> Correct</>
                ) : (
                  <><XCircle className="h-4 w-4 text-petal-600" /> Incorrect</>
                )}
              </p>
              <p className="mt-1 text-sm text-bark-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="mt-5 flex justify-end gap-3">
            {reviewCorrect === null ? (
              <button
                type="button"
                disabled={selectedAnswer === null}
                onClick={submitCurrentAnswer}
                className="rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {settings.immediateFeedback ? 'Check Answer' : 'Next'}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextAfterReview}
                className="inline-flex items-center gap-2 rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700"
              >
                {currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'Finish Drill'}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center gap-3">
        <Target className="h-7 w-7 text-leaf-600" />
        <h1 className="text-3xl font-display font-bold text-bark-900">Drill Mode</h1>
      </div>
      <p className="mt-2 text-bark-600">Build a mixed quiz from completed modules and sharpen recall.</p>

      <div className="mt-6 rounded-xl border border-bark-100 bg-white p-5">
        <h2 className="font-semibold text-bark-900">Eligible Modules</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {eligibleModules.map((mod) => {
            const checked = selectedModuleIds.includes(mod.id);
            return (
              <label key={mod.id} className="flex items-center gap-2 rounded-lg border border-bark-100 px-3 py-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    setSelectedModuleIds((prev) => {
                      if (e.target.checked) return [...prev, mod.id];
                      return prev.filter((id) => id !== mod.id);
                    });
                  }}
                />
                <span className="text-sm text-bark-700">{mod.icon} {mod.title}</span>
              </label>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="text-sm text-bark-700">
            Questions
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-bark-200 px-3 py-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
            </select>
          </label>

          <label className="text-sm text-bark-700 flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              checked={includeTrueFalse}
              onChange={(e) => setIncludeTrueFalse(e.target.checked)}
            />
            Include true/false
          </label>

          <label className="text-sm text-bark-700 flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              checked={immediateFeedback}
              onChange={(e) => setImmediateFeedback(e.target.checked)}
            />
            Immediate feedback
          </label>
        </div>

        <p className="mt-4 text-sm text-bark-600">Available questions in current pool: {availablePool.length}</p>

        <button
          type="button"
          disabled={selectedModuleIds.length === 0 || availablePool.length === 0}
          onClick={startDrill}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Drill
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
