import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import { getLessonById, getLessonBySlug } from '../data';
import { getTaxonIdForLesson } from '../data/taxon-map';
import { useProgressStore } from '../store/progressStore';
import { ContentRenderer } from '../components/ContentRenderer';
import { QuizRunner } from '../components/QuizRunner';
import { RegionalSpotlight } from '../components/RegionalSpotlight';

export function LessonPage() {
  const { slug } = useParams();
  const lesson = getLessonBySlug(slug ?? '');
  const lessonProgress = useProgressStore((s) => s.lessonProgress);
  const startLesson = useProgressStore((s) => s.startLesson);
  const completeSection = useProgressStore((s) => s.completeSection);

  useEffect(() => {
    if (lesson) {
      startLesson(lesson.id);
    }
  }, [lesson, startLesson]);

  useEffect(() => {
    if (!lesson) return;

    const doneIds = new Set(lessonProgress[lesson.id]?.sectionsCompleted ?? []);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.6) continue;

          const sectionId = entry.target.getAttribute('data-section-id');
          if (!sectionId || doneIds.has(sectionId)) continue;

          completeSection(lesson.id, sectionId);
          doneIds.add(sectionId);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: [0.6],
        rootMargin: '0px 0px -15% 0px',
      },
    );

    for (const section of lesson.sections) {
      if (doneIds.has(section.id)) continue;
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [lesson, lessonProgress, completeSection]);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-3xl font-display font-bold text-bark-900">Lesson not found</h1>
        <p className="mt-2 text-bark-500">This lesson does not exist.</p>
        <Link to="/browse" className="mt-5 inline-block text-leaf-700 font-medium hover:underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  const progress = lessonProgress[lesson.id];
  const sectionDone = new Set(progress?.sectionsCompleted ?? []);
  const allSectionsComplete = lesson.sections.every((section) => sectionDone.has(section.id));

  const unmetPrerequisites = lesson.prerequisites.filter(
    (prereqId) => !lessonProgress[prereqId]?.completed,
  );

  const jumpToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-leaf-100 to-sky-100 p-6 md:p-8 border border-leaf-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-leaf-700 font-medium">{lesson.icon} Interactive Lesson</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-display font-bold text-bark-900">{lesson.title}</h1>
            <p className="mt-3 text-bark-600 max-w-3xl">{lesson.description}</p>
          </div>
          <span className="shrink-0 rounded-full bg-white/80 px-3 py-1.5 text-sm text-bark-600">
            {lesson.estimatedMinutes} min
          </span>
        </div>
      </div>

      {unmetPrerequisites.length > 0 && (
        <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <div className="flex items-center gap-2 text-amber-700 font-semibold">
            <Lock className="h-4 w-4" />
            Prerequisites not completed yet
          </div>
          <p className="mt-2 text-sm text-amber-700">For the best learning flow, complete these first:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {unmetPrerequisites.map((id) => {
              const prereq = getLessonById(id);
              return prereq ? (
                <Link
                  key={id}
                  to={`/lesson/${prereq.slug}`}
                  className="rounded-full bg-white px-3 py-1.5 text-sm text-amber-700 border border-amber-300 hover:bg-amber-100"
                >
                  {prereq.title}
                </Link>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 h-fit space-y-4">
          <RegionalSpotlight taxonId={getTaxonIdForLesson(lesson.id)} />
          <div className="rounded-2xl border border-bark-100 bg-white p-4 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-bark-900 mb-3">Sections</h2>
            <nav className="space-y-1.5 max-h-[40vh] overflow-y-auto">
              {lesson.sections.map((section) => {
                const done = sectionDone.has(section.id);
                return (
                  <button
                    key={section.id}
                    onClick={() => jumpToSection(section.id)}
                    className="w-full flex items-start gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-leaf-50"
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-leaf-600 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 mt-0.5 text-bark-300 shrink-0" />
                    )}
                    <span className="text-sm text-bark-700">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="space-y-8">
          {lesson.sections.map((section) => {
            const done = sectionDone.has(section.id);
            return (
              <section
                id={section.id}
                data-section-id={section.id}
                key={section.id}
                className="rounded-2xl border border-bark-100 bg-white p-6 md:p-8 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-display font-semibold text-bark-900">{section.title}</h2>
                  <button
                    onClick={() => completeSection(lesson.id, section.id)}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      done
                        ? 'bg-leaf-100 text-leaf-700'
                        : 'bg-bark-100 text-bark-600 hover:bg-leaf-100 hover:text-leaf-700'
                    }`}
                  >
                    {done ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
                <ContentRenderer blocks={section.content} />
              </section>
            );
          })}

          <section className="rounded-2xl border border-bark-100 bg-white p-6 md:p-8 shadow-sm">
            {!allSectionsComplete ? (
              <div className="text-center py-10">
                <p className="text-5xl">📘</p>
                <h3 className="mt-3 text-xl font-display font-semibold text-bark-900">Finish all sections to unlock quiz</h3>
                <p className="mt-2 text-bark-500">Sections auto-complete as you read, or mark manually if needed.</p>
              </div>
            ) : (
              <QuizRunner quiz={lesson.quiz} lessonId={lesson.id} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
