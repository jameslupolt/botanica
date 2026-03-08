import { Link } from 'react-router-dom';
import type { ComponentType } from 'react';
import { Award, BarChart3, BookOpen, Flame, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ALL_LESSONS } from '../data';
import { ALL_MODULES, getModuleLessons, getModuleProgress } from '../data/modules';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { ACHIEVEMENTS } from '../data/achievements';
import { AchievementBadge } from '../components/AchievementBadge';
import { RegionalPlants } from '../components/RegionalPlants';

export function DashboardPage() {
  const profile = useAuthStore((s) => s.profile);
  const progress = useProgressStore((s) => s.lessonProgress);
  const unlocked = useProgressStore((s) => s.unlockedAchievements);
  const streak = useProgressStore((s) => s.streak);
  const completedCount = useProgressStore((s) => s.getCompletedCount());
  const avgScore = useProgressStore((s) => s.getTotalQuizAverage());
  const progressError = useProgressStore((s) => s.error);

  const nextLesson = ALL_LESSONS.find((lesson) => !progress[lesson.id]?.completed) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-display font-bold text-bark-900">Welcome back, {profile?.displayName}</h1>
      <p className="mt-1 text-bark-500">Here is your learning progress snapshot.</p>
      {progressError && (
        <p className="mt-3 rounded-xl border border-petal-200 bg-petal-50 px-3 py-2 text-sm text-petal-800">
          {progressError}
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Lessons Completed" value={`${completedCount}/${ALL_LESSONS.length}`} />
        <StatCard icon={BarChart3} label="Average Quiz Score" value={`${avgScore}%`} />
        <StatCard icon={Flame} label="Current Streak" value={`${streak} day${streak === 1 ? '' : 's'}`} />
        <StatCard icon={Award} label="Achievements" value={`${unlocked.length}/${ACHIEVEMENTS.length}`} />
      </div>

      {nextLesson && (
        <div className="mt-8 rounded-2xl border border-leaf-200 bg-leaf-50 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-leaf-700 font-medium">Recommended Next Lesson</p>
            <h2 className="text-xl font-display font-semibold text-bark-900 mt-1">
              {nextLesson.icon} {nextLesson.title}
            </h2>
            <p className="text-sm text-bark-600 mt-1">{nextLesson.description}</p>
          </div>
          <Link
            to={`/lesson/${nextLesson.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="mt-4">
        <Link
          to="/drill"
          className="inline-flex items-center gap-2 rounded-xl border border-bark-200 bg-white px-4 py-2.5 text-bark-700 font-medium hover:bg-bark-50"
        >
          Practice in Drill Mode
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8">
        <section>
          <h2 className="text-xl font-display font-semibold text-bark-900 mb-4">Module Progress</h2>
          <div className="space-y-4">
            {ALL_MODULES.map((mod) => {
              const modProgress = getModuleProgress(mod, progress);
              const lessons = getModuleLessons(mod);
              const isComplete = modProgress.completed === modProgress.total;

              return (
                <div key={mod.id} className="rounded-xl border border-bark-100 bg-white p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{mod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-bark-800 truncate">
                          {mod.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          {isComplete && <CheckCircle2 className="h-4 w-4 text-leaf-500" />}
                          <span className="text-xs text-bark-500">
                            {modProgress.completed}/{modProgress.total}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-bark-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-leaf-500 transition-all"
                          style={{ width: `${modProgress.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 ml-9">
                    {lessons.map((lesson) => {
                      const lp = progress[lesson.id];
                      const done = lp?.completed ?? false;
                      return (
                        <Link
                          key={lesson.id}
                          to={`/lesson/${lesson.slug}`}
                          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-leaf-50 transition-colors"
                        >
                          {done ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-leaf-500 shrink-0" />
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full border border-bark-300 shrink-0" />
                          )}
                          <span className={done ? 'text-bark-500' : 'text-bark-700'}>
                            {lesson.icon} {lesson.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-display font-semibold text-bark-900 mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  unlocked={unlocked.includes(achievement.id)}
                />
              ))}
            </div>
          </section>
          <RegionalPlants limit={6} />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-bark-100 bg-white p-4 shadow-sm">
      <div className="w-9 h-9 rounded-lg bg-leaf-100 flex items-center justify-center">
        <Icon className="h-5 w-5 text-leaf-700" />
      </div>
      <p className="mt-3 text-xs text-bark-500">{label}</p>
      <p className="text-xl font-display font-semibold text-bark-900">{value}</p>
    </div>
  );
}
