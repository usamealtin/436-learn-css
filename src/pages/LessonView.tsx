import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  memo,
} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgress } from '@/hooks/useProgress';
import { getLesson, courseModules, PASSING_SCORE } from '@/data/courseData';
import Quiz from '@/components/Quiz';
import PageTransition from '@/components/PageTransition';
import {
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiAward,
  FiLock,
} from 'react-icons/fi';

// ─────────────────────────────────────────────────────────────────────────────
// NextLessonButton — extracted as a NAMED, MEMOISED component so React never
// tears it down and re-creates it on every render (which was the cause of the
// "button disappears" symptom).
// ─────────────────────────────────────────────────────────────────────────────
interface NextBtnProps {
  canGoNext: boolean;
  label: string;
  variant: 'sidebar' | 'inline';
  onClick: () => void;
}

const NextLessonButton = memo(function NextLessonButton({
  canGoNext,
  label,
  variant,
  onClick,
}: NextBtnProps) {
  const icon = canGoNext ? <FiChevronRight /> : <FiLock className="text-xs" />;

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={!canGoNext}
        title={canGoNext ? 'Proceed to next lesson' : 'Complete the quiz to unlock'}
        className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-medium transition-all ${
          canGoNext
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  }

  // sidebar variant
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!canGoNext}
      title={canGoNext ? 'Proceed to next lesson' : 'Complete the quiz to unlock'}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        canGoNext
          ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer shadow-sm'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
      }`}
    >
      {canGoNext ? (
        <FiCheck className="text-sm flex-shrink-0" />
      ) : (
        <FiLock className="text-sm flex-shrink-0" />
      )}
      <span className="hidden sm:inline truncate max-w-[120px]">{label}</span>
      {canGoNext && <FiChevronRight className="text-xs flex-shrink-0" />}
    </button>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// LessonView
// ─────────────────────────────────────────────────────────────────────────────
const LessonView: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams<{
    moduleId: string;
    lessonId: string;
  }>();
  const { isLessonLocked, completeLesson, getModuleStates } = useProgress();
  const topbarRef = useRef<HTMLDivElement>(null);
  const [topbarScrolled, setTopbarScrolled] = useState(false);

  // ── Quiz state ──────────────────────────────────────────────────────────────
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizPassed, setQuizPassed] = useState(false);

  // FIX 1 ─ Reset ALL quiz state whenever the lesson changes.
  //          Without this, navigating to the next lesson keeps the old state:
  //          quizCompleted=true + quizPassed=true → "Take Quiz" never renders.
  useEffect(() => {
    setShowQuiz(false);
    setQuizCompleted(false);
    setQuizScore(null);
    setQuizPassed(false);
  }, [lessonId]);

  // ── Scroll to top on lesson change ─────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    return () => clearTimeout(id);
  }, [lessonId]);

  // ── Topbar shadow on scroll ─────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setTopbarScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Derive lesson data ──────────────────────────────────────────────────────
  const data = lessonId ? getLesson(lessonId) : null;
  const moduleStates = getModuleStates();

  // ── "Not found" guard ───────────────────────────────────────────────────────
  if (!data || !moduleId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Lesson Not Found
          </h1>
          <Link to="/courses" className="text-blue-600 hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const { lesson, module: mod } = data;

  // ── Locked guard ────────────────────────────────────────────────────────────
  const locked = isLessonLocked(lesson._id, moduleId);
  if (locked) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center max-w-md animate-fadeIn">
          <FiLock className="text-gray-400 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('lms.lessonLocked')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('lms.completePrerequisites')}
          </p>
          <Link
            to="/courses"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('common.courses')}
          </Link>
        </div>
      </div>
    );
  }

  // ── Navigation context ─────────────────────────────────────────────────────
  const modIndex = courseModules.findIndex(m => m._id === moduleId);
  const currentMod = courseModules[modIndex];
  const lessonIndex = currentMod.lessons.findIndex(l => l._id === lessonId);

  const prevLesson = lessonIndex > 0 ? currentMod.lessons[lessonIndex - 1] : null;

  // FIX 3 ─ Bounds check: only set nextLesson if it actually exists in the array.
  const nextLesson =
    lessonIndex >= 0 && lessonIndex < currentMod.lessons.length - 1
      ? currentMod.lessons[lessonIndex + 1]
      : null;

  // FIX 3 ─ Bounds check: only set nextModule if it exists AND has at least one lesson.
  const completedCount = moduleStates[modIndex]?.completedLessons?.length ?? 0;
  const allLessonsDone = completedCount === currentMod.lessons.length;
  const nextModCandidate =
    allLessonsDone && modIndex >= 0 && modIndex < courseModules.length - 1
      ? courseModules[modIndex + 1]
      : null;
  const nextModule =
    nextModCandidate && nextModCandidate.lessons.length > 0
      ? nextModCandidate
      : null;

  // ── Button label ────────────────────────────────────────────────────────────
  const nextLabel = nextLesson
    ? t('lms.nextLesson')
    : nextModule
    ? `Next: ${nextModule.title}`
    : t('lms.finalExam');

  // ── Handlers ────────────────────────────────────────────────────────────────
  // FIX 3 ─ goToNextLesson: hard guard + array-bounds safety before navigating.
  const goToNextLesson = useCallback(() => {
    if (!quizPassed) return; // must have passed the quiz

    if (nextLesson) {
      navigate(`/courses/${moduleId}/${nextLesson._id}`);
      return;
    }

    if (nextModule && nextModule.lessons.length > 0) {
      navigate(`/courses/${nextModule._id}/${nextModule.lessons[0]._id}`);
      return;
    }

    // No more lessons or modules → go to final exam
    navigate('/final-exam');
  }, [quizPassed, navigate, moduleId, nextLesson, nextModule]);

  const goToPreviousLesson = useCallback(() => {
    if (prevLesson) {
      navigate(`/courses/${moduleId}/${prevLesson._id}`);
    }
  }, [navigate, moduleId, prevLesson]);

  // FIX 1 – handleQuizComplete only sets state; the useEffect above handles
  //          resetting when lessonId changes.
  const handleQuizComplete = useCallback(
    (score: number) => {
      const passed = score >= PASSING_SCORE;
      completeLesson(lesson._id, moduleId, score);
      setQuizScore(score);
      setQuizPassed(passed);
      setQuizCompleted(true);
    },
    [completeLesson, lesson._id, moduleId]
  );

  const handleTryAgain = useCallback(() => {
    setShowQuiz(true);
    setQuizCompleted(false);
    setQuizScore(null);
    setQuizPassed(false);
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* ══════════════ STICKY TOP BAR ══════════════ */}
        <div
          ref={topbarRef}
          className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700
                      sticky top-16 z-40 transition-shadow duration-300
                      ${topbarScrolled ? 'shadow-md' : ''}`}
        >
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
            {/* Left: back + title */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/courses"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700
                           dark:hover:text-gray-300 p-1 -ml-1 rounded-lg
                           hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
              >
                <FiChevronLeft className="text-xl" />
              </Link>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Module {mod.order} · {mod.title}
                </p>
                <h1 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {lesson.title}
                </h1>
              </div>
            </div>

            {/* Right: prev + next */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Previous */}
              {prevLesson ? (
                <button
                  type="button"
                  onClick={goToPreviousLesson}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400
                             border border-gray-300 dark:border-gray-600 rounded-lg
                             hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiChevronLeft className="text-xs" />
                  <span className="hidden sm:inline">{t('lms.previousLesson')}</span>
                </button>
              ) : (
                <Link
                  to="/courses"
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400
                             border border-gray-300 dark:border-gray-600 rounded-lg
                             hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiChevronLeft className="text-xs" />
                  <span className="hidden sm:inline">Courses</span>
                </Link>
              )}

              {/* Next – always visible, disabled until quiz is passed */}
              <NextLessonButton
                canGoNext={quizPassed}
                label={nextLabel}
                variant="sidebar"
                onClick={goToNextLesson}
              />
            </div>
          </div>
        </div>

        {/* ══════════════ MAIN CONTENT ══════════════ */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Lesson body */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 sm:p-8 mb-8">
            <div
              className="lesson-content"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>

          {/* ══════════════ QUIZ SECTION ══════════════
              FIX 2 – Conditional rendering priority:
                1. quizCompleted  → show results panel
                2. showQuiz       → show Quiz component
                3. default        → show "Take Quiz" prompt  (ALWAYS renders first for any fresh lesson)
          */}
          {quizCompleted ? (
            /* ── Results panel ── */
            <div
              className={`rounded-xl p-8 text-center ${
                quizPassed
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
              }`}
            >
              {quizPassed ? (
                <>
                  <FiCheck className="text-green-500 text-5xl mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                    {t('lms.quizPassed')}
                  </h2>
                  <p className="text-lg text-green-600 dark:text-green-300 mb-1">
                    {t('lms.yourScore')}: <strong>{quizScore}%</strong>
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-6">
                    ✅ The &quot;Next Lesson&quot; button is now unlocked!
                  </p>
                </>
              ) : (
                <>
                  <FiX className="text-red-500 text-5xl mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
                    {t('lms.quizFailed')}
                  </h2>
                  <p className="text-lg text-red-600 dark:text-red-300 mb-1">
                    {t('lms.yourScore')}: <strong>{quizScore}%</strong>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    You need at least {PASSING_SCORE}% to pass. Try again!
                  </p>
                </>
              )}

              <div className="flex flex-wrap justify-center gap-3">
                {/* Try Again – only on failure */}
                {!quizPassed && (
                  <button
                    type="button"
                    onClick={handleTryAgain}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                )}

                {/* Previous lesson link */}
                {prevLesson && (
                  <Link
                    to={`/courses/${moduleId}/${prevLesson._id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-white dark:bg-gray-800
                               text-gray-700 dark:text-gray-300 rounded-lg border
                               border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-colors"
                  >
                    <FiChevronLeft />
                    {t('lms.previousLesson')}
                  </Link>
                )}

                {/* Next – only active after passing */}
                <NextLessonButton
                  canGoNext={quizPassed}
                  label={nextLabel}
                  variant="inline"
                  onClick={goToNextLesson}
                />
              </div>
            </div>
          ) : showQuiz ? (
            /* ── Active quiz ── */
            <div className="animate-fadeIn">
              <Quiz
                quiz={lesson.quiz}
                onComplete={handleQuizComplete}
                moduleName={mod.title}
                lessonName={lesson.title}
              />
            </div>
          ) : (
            /* ── "Take Quiz" prompt – the DEFAULT state for every fresh lesson ── */
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 text-center animate-fadeIn">
              <FiAward className="text-4xl text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Ready for the quiz?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Score at least{' '}
                <strong className="text-blue-600 dark:text-blue-400">
                  {PASSING_SCORE}%
                </strong>{' '}
                to unlock the next lesson.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                The &quot;Next Lesson&quot; button activates only after you pass.
              </p>
              <button
                type="button"
                onClick={() => setShowQuiz(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white
                           rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700
                           transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {t('lms.startQuiz')}
              </button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default LessonView;
