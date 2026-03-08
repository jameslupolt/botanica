import { Link } from 'react-router-dom';
import { Clock, CheckCircle2 } from 'lucide-react';
import type { Lesson } from '../types';
import { DIFFICULTY_META, CATEGORY_META } from '../types';
import { useProgressStore } from '../store/progressStore';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const progress = useProgressStore((s) => s.lessonProgress[lesson.id]);
  const isCompleted = progress?.completed ?? false;
  const category = CATEGORY_META[lesson.category];
  const difficulty = DIFFICULTY_META[lesson.difficulty];

  return (
    <Link
      to={`/lesson/${lesson.slug}`}
      className="group relative flex flex-col rounded-2xl bg-white border border-bark-100 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden"
    >
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <CheckCircle2 className="h-6 w-6 text-leaf-500 fill-leaf-100" />
        </div>
      )}

      <div className="flex items-center gap-3 p-5 pb-3">
        <span className="text-3xl">{lesson.icon}</span>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-lg text-bark-900 group-hover:text-leaf-700 transition-colors truncate">
            {lesson.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs">{category.icon}</span>
            <span className="text-xs text-bark-500">{category.label}</span>
          </div>
        </div>
      </div>

      <p className="px-5 text-sm text-bark-600 leading-relaxed line-clamp-2 flex-1">
        {lesson.description}
      </p>

      <div className="flex items-center justify-between px-5 py-3 mt-auto border-t border-bark-50">
        <div className="flex items-center gap-1.5 text-bark-400">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs">{lesson.estimatedMinutes} min</span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficulty.color}`}>
          {difficulty.label}
        </span>
      </div>

      {isCompleted && (
        <div className="h-1 bg-leaf-400" />
      )}
    </Link>
  );
}
