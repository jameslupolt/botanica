import { useState, useCallback } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';
import type { Quiz, QuizQuestion } from '../types';
import { useProgressStore } from '../store/progressStore';

interface QuizRunnerProps {
  quiz: Quiz;
  lessonId: string;
}

export function QuizRunner({ quiz, lessonId }: QuizRunnerProps) {
  const submitQuiz = useProgressStore((s) => s.submitQuiz);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quiz.questions[currentIdx] as typeof quiz.questions[number] | undefined;
  const total = quiz.questions.length;

  if (!question) {
    return (
      <div className="text-center py-10">
        <p className="text-bark-600">No quiz questions available for this lesson.</p>
      </div>
    );
  }

  const isCorrect = selected !== null && selected === (question.correctAnswer as number);

  const handleSelect = useCallback((idx: number) => {
    if (showResult) return;
    setSelected(idx);
  }, [showResult]);

  const handleCheck = useCallback(() => {
    if (selected === null) return;
    setShowResult(true);
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  }, [selected, isCorrect]);

  const handleNext = useCallback(() => {
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      submitQuiz(lessonId, score, total);
      setFinished(true);
    }
  }, [currentIdx, total, score, submitQuiz, lessonId]);

  const handleRetake = useCallback(() => {
    setCurrentIdx(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= quiz.passingScore;
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-leaf-100 mb-4">
          <Trophy className={`h-10 w-10 ${passed ? 'text-leaf-600' : 'text-bark-400'}`} />
        </div>
        <h3 className="text-2xl font-display font-bold text-bark-900 mb-2">
          {passed ? 'Congratulations!' : 'Keep Studying!'}
        </h3>
        <p className="text-lg text-bark-600 mb-1">
          You scored <span className="font-bold text-bark-900">{score}/{total}</span> ({pct}%)
        </p>
        <p className="text-sm text-bark-500 mb-6">
          {passed
            ? 'You passed! This lesson is now marked as complete.'
            : `You need ${quiz.passingScore}% to pass. Review the material and try again.`}
        </p>
        {!passed && (
          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-leaf-600 text-white font-medium hover:bg-leaf-700 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </button>
        )}
        {passed && (
          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-bark-200 text-bark-600 font-medium hover:bg-bark-50 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again for a Better Score
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-bark-800">
          {quiz.title}
        </h3>
        <span className="text-sm text-bark-500">
          Question {currentIdx + 1} of {total}
        </span>
      </div>

      <div className="mb-2 h-1.5 rounded-full bg-bark-100">
        <div
          className="h-full rounded-full bg-leaf-500 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      <QuestionCard
        question={question}
        selected={selected}
        showResult={showResult}
        onSelect={handleSelect}
      />

      <div className="mt-6 flex justify-end">
        {!showResult ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className="px-6 py-2.5 rounded-xl bg-leaf-600 text-white font-medium hover:bg-leaf-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-leaf-600 text-white font-medium hover:bg-leaf-700 transition-colors"
          >
            {currentIdx < total - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  selected,
  showResult,
  onSelect,
}: {
  question: QuizQuestion;
  selected: number | null;
  showResult: boolean;
  onSelect: (idx: number) => void;
}) {
  const correctIdx = question.correctAnswer as number;

  return (
    <div className="mt-6">
      <p className="text-bark-900 font-medium mb-4 text-lg">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          let styles = 'border-bark-200 hover:border-leaf-300 hover:bg-leaf-50';
          if (selected === idx && !showResult) {
            styles = 'border-leaf-500 bg-leaf-50 ring-2 ring-leaf-200';
          }
          if (showResult && idx === correctIdx) {
            styles = 'border-leaf-500 bg-leaf-50';
          }
          if (showResult && selected === idx && idx !== correctIdx) {
            styles = 'border-petal-400 bg-petal-50';
          }

          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              disabled={showResult}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 flex items-center gap-3 ${styles} disabled:cursor-default`}
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-bark-300 text-sm font-medium text-bark-500 shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-bark-700 flex-1">{option}</span>
              {showResult && idx === correctIdx && (
                <CheckCircle2 className="h-5 w-5 text-leaf-500 shrink-0" />
              )}
              {showResult && selected === idx && idx !== correctIdx && (
                <XCircle className="h-5 w-5 text-petal-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`mt-4 rounded-xl p-4 ${
          selected === correctIdx ? 'bg-leaf-50 border border-leaf-200' : 'bg-petal-50 border border-petal-200'
        }`}>
          <p className="text-sm font-medium mb-1 flex items-center gap-2">
            {selected === correctIdx ? (
              <><CheckCircle2 className="h-4 w-4 text-leaf-600" /> Correct!</>
            ) : (
              <><XCircle className="h-4 w-4 text-petal-600" /> Incorrect</>
            )}
          </p>
          <p className="text-sm text-bark-600">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
