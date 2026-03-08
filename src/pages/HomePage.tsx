import { Link } from 'react-router-dom';
import { BookOpen, Brain, BarChart3, Award, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { ALL_LESSONS } from '../data';
import { ALL_MODULES } from '../data/modules';
import { LessonCard } from '../components/LessonCard';

const FEATURES = [
  { icon: BookOpen, title: `${ALL_MODULES.length} Learning Modules`, desc: `${ALL_LESSONS.length} lessons from cell biology to ecology` },
  { icon: Brain, title: 'Interactive Quizzes', desc: 'Test your knowledge after each lesson' },
  { icon: BarChart3, title: 'Track Progress', desc: 'See how far you\'ve come' },
  { icon: Award, title: 'Earn Achievements', desc: 'Unlock badges as you learn' },
];

export function HomePage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const profile = useAuthStore((s) => s.profile);
  const lessonProgress = useProgressStore((s) => s.lessonProgress);

  const nextLesson = ALL_LESSONS.find((l) => !lessonProgress[l.id]?.completed);
  const featuredLessons = ALL_LESSONS.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-white to-leaf-100">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-[200px] leading-none font-display">
          <span className="absolute top-10 left-10">🌿</span>
          <span className="absolute bottom-10 right-10">🌱</span>
          <span className="absolute top-1/2 right-1/4 text-[120px]">🍃</span>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-bark-900 mb-6 leading-tight">
            Master the{' '}
            <span className="text-leaf-600">Science</span>
            {' '}of Plants
          </h1>
          <p className="text-lg md:text-xl text-bark-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Interactive lessons, quizzes, and progress tracking to help you understand
            the fascinating world of botany — from cellular structures to entire ecosystems.
          </p>

          {isAuthenticated && nextLesson ? (
            <div className="space-y-3">
              <p className="text-bark-500">Welcome back, {profile?.displayName}!</p>
              <Link
                to={`/lesson/${nextLesson.slug}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-leaf-600 text-white font-medium text-lg hover:bg-leaf-700 transition-colors shadow-lg shadow-leaf-200"
              >
                Continue Learning
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/browse"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-leaf-600 text-white font-medium text-lg hover:bg-leaf-700 transition-colors shadow-lg shadow-leaf-200"
              >
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-leaf-200 text-leaf-700 font-medium text-lg hover:bg-leaf-50 transition-colors"
                >
                  Create Account
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center">
              <div className="mx-auto w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center mb-3">
                <f.icon className="h-6 w-6 text-leaf-600" />
              </div>
              <h3 className="font-semibold text-bark-900 text-sm">{f.title}</h3>
              <p className="text-xs text-bark-500 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-bark-900">Featured Lessons</h2>
          <Link
            to="/browse"
            className="text-sm font-medium text-leaf-600 hover:text-leaf-700 flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </div>
  );
}
