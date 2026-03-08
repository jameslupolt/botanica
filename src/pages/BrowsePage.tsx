import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Clock, Lock } from 'lucide-react';
import { ALL_MODULES, getModuleLessons, getModuleProgress } from '../data/modules';
import { useProgressStore } from '../store/progressStore';
import { DIFFICULTY_META } from '../types';
import type { Module, Lesson, LessonProgress } from '../types';

export function BrowsePage() {
  const lessonProgress = useProgressStore((s) => s.lessonProgress);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => {
    // Auto-expand the first module that has incomplete lessons
    for (const mod of ALL_MODULES) {
      const progress = getModuleProgress(mod, lessonProgress);
      if (progress.completed < progress.total) {
        return new Set([mod.id]);
      }
    }
    return new Set([ALL_MODULES[0]?.id].filter(Boolean));
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-display font-bold text-bark-900 mb-2">Learning Path</h1>
      <p className="text-bark-500 mb-10">
        Work through these modules in order, or jump to any topic that interests you.
      </p>

      <div className="space-y-4">
        {ALL_MODULES.map((mod, index) => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            index={index}
            expanded={expandedModules.has(mod.id)}
            onToggle={() => toggleModule(mod.id)}
            lessonProgress={lessonProgress}
          />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({
  mod,
  index,
  expanded,
  onToggle,
  lessonProgress,
}: {
  mod: Module;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  lessonProgress: Record<string, LessonProgress>;
}) {
  const lessons = getModuleLessons(mod);
  const progress = getModuleProgress(mod, lessonProgress);
  const isComplete = progress.completed === progress.total;

  return (
    <div className="rounded-2xl border border-bark-100 bg-white shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-leaf-50/50 transition-colors"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-leaf-100 text-xl shrink-0">
          {mod.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-bark-400 uppercase tracking-wide">
              Module {index + 1}
            </span>
            {isComplete && (
              <CheckCircle2 className="h-4 w-4 text-leaf-500" />
            )}
          </div>
          <h2 className="font-display font-semibold text-lg text-bark-900 mt-0.5">
            {mod.title}
          </h2>
          <p className="text-sm text-bark-500 mt-1 line-clamp-1">{mod.description}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-2 rounded-full bg-bark-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-leaf-500 transition-all"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <span className="text-xs text-bark-500 w-16 text-right">
              {progress.completed}/{progress.total}
            </span>
          </div>
          {expanded ? (
            <ChevronDown className="h-5 w-5 text-bark-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-bark-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-bark-100 px-5 py-3">
          <div className="space-y-1">
            {lessons.map((lesson) => (
              <UnitRow
                key={lesson.id}
                lesson={lesson}
                lessonProgress={lessonProgress}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UnitRow({
  lesson,
  lessonProgress,
}: {
  lesson: Lesson;
  lessonProgress: Record<string, LessonProgress>;
}) {
  const progress = lessonProgress[lesson.id];
  const isCompleted = progress?.completed ?? false;
  const isStarted = !!progress;
  const difficulty = DIFFICULTY_META[lesson.difficulty];

  const unmetPrereqs = lesson.prerequisites.filter(
    (prereqId) => !lessonProgress[prereqId]?.completed,
  );
  const isLocked = unmetPrereqs.length > 0;

  return (
    <Link
      to={`/lesson/${lesson.slug}`}
      className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-leaf-50 transition-colors group"
    >
      <div className="flex items-center justify-center w-7 h-7 shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="h-5 w-5 text-leaf-500" />
        ) : isLocked ? (
          <Lock className="h-4 w-4 text-bark-300" />
        ) : (
          <Circle className="h-5 w-5 text-bark-300 group-hover:text-leaf-400 transition-colors" />
        )}
      </div>

      <span className="text-xl">{lesson.icon}</span>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isLocked ? 'text-bark-400' : 'text-bark-800 group-hover:text-leaf-700'} transition-colors`}>
          {lesson.title}
        </p>
        {isStarted && !isCompleted && (
          <p className="text-xs text-bark-400 mt-0.5">
            {progress.sectionsCompleted.length}/{lesson.sections.length} sections
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5 text-bark-400">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs">{lesson.estimatedMinutes} min</span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficulty.color}`}>
          {difficulty.label}
        </span>
      </div>
    </Link>
  );
}
