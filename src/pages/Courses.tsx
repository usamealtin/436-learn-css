import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useProgress, ModuleState } from '@/hooks/useProgress';
import { courseModules, getModuleLessons } from '@/data/courseData';
import PageTransition from '@/components/PageTransition';
import {
  FiLock,
  FiCheckCircle,
  FiPlayCircle,
  FiAlertTriangle,
  FiBook,
  FiChevronRight,
  FiAward,
  FiX,
  FiInfo,
} from 'react-icons/fi';

// ─────────────────────────────────────────────────────────────────────────────
// LockedLessonModal
// Shown when the user clicks a lesson inside a locked module.
// ─────────────────────────────────────────────────────────────────────────────
interface LockedModalProps {
  moduleName: string;
  lessonName: string;
  onClose: () => void;
}

const LockedLessonModal: React.FC<LockedModalProps> = ({
  moduleName,
  lessonName,
  onClose,
}) => {
  const { t } = useTranslation();

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overlay-enter"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="locked-modal-title"
    >
      {/* Card — stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl
                   p-8 text-center animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400
                     hover:text-gray-600 dark:hover:text-gray-200
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FiX className="text-lg" />
        </button>

        {/* Lock icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200
                        dark:from-gray-800 dark:to-gray-700 flex items-center justify-center
                        mx-auto mb-5 shadow-inner">
          <FiLock className="text-gray-500 dark:text-gray-400 text-3xl" />
        </div>

        {/* Title */}
        <h2
          id="locked-modal-title"
          className="text-xl font-bold text-gray-900 dark:text-white mb-2"
        >
          {t('lms.moduleLocked')}
        </h2>

        {/* Body copy — EN + TR side-by-side */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          Please unlock <strong className="text-gray-800 dark:text-white">
            {moduleName}
          </strong> to access its content.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 italic mb-4">
          Bu modülü açmak için bir önceki modülü tamamlayın. (Kilidi açmanız gerekiyor)
        </p>

        {/* Lesson preview chip */}
        <div className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800
                        rounded-lg px-4 py-2 mb-6 mx-auto w-fit max-w-full">
          <FiBook className="text-gray-400 flex-shrink-0 text-sm" />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {lessonName}
          </span>
        </div>

        {/* Info tip */}
        <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20
                        border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6 text-left">
          <FiInfo className="text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            {t('lms.completePrerequisites')}. Score ≥ 80 % on every lesson quiz in the
            previous module to unlock this one.
          </p>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600
                     text-white rounded-lg font-semibold hover:from-blue-700
                     hover:to-purple-700 transition-all"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Courses
// ─────────────────────────────────────────────────────────────────────────────
interface LockedTarget {
  moduleName: string;
  lessonName: string;
}

const Courses: React.FC = () => {
  const { t } = useTranslation();
  const { getModuleStates } = useProgress();

  // Modules that are currently expanded (open accordion)
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Modal state — null means closed
  const [lockedTarget, setLockedTarget] = useState<LockedTarget | null>(null);

  const moduleStates = getModuleStates();

  // ── Toggle accordion (works for ALL modules now, locked or not) ─────────────
  const toggleModule = useCallback((moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  }, []);

  // ── Show the locked-lesson modal ────────────────────────────────────────────
  const openLockedModal = useCallback((moduleName: string, lessonName: string) => {
    setLockedTarget({ moduleName, lessonName });
  }, []);

  const closeLockedModal = useCallback(() => {
    setLockedTarget(null);
  }, []);

  // ── Helpers for status display ──────────────────────────────────────────────
  const getStatusIcon = (status: ModuleState['status']) => {
    switch (status) {
      case 'locked':          return <FiLock className="text-gray-400" />;
      case 'in-progress':     return <FiPlayCircle className="text-blue-500" />;
      case 'completed':       return <FiCheckCircle className="text-green-500" />;
      case 'retake-required': return <FiAlertTriangle className="text-yellow-500" />;
    }
  };

  const getStatusText = (status: ModuleState['status']) => {
    switch (status) {
      case 'locked':          return t('lms.moduleLocked');
      case 'in-progress':     return t('dashboard.progress');
      case 'completed':       return t('common.success');
      case 'retake-required': return t('lms.retakeExam');
    }
  };

  const getStatusBadgeColor = (status: ModuleState['status']) => {
    switch (status) {
      case 'locked':
        return 'bg-gray-100 text-gray-500 dark:bg-gray-700/60 dark:text-gray-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400';
      case 'retake-required':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400';
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <PageTransition>
      {/* Locked-lesson modal (portal-level, sits above everything) */}
      {lockedTarget && (
        <LockedLessonModal
          moduleName={lockedTarget.moduleName}
          lessonName={lockedTarget.lessonName}
          onClose={closeLockedModal}
        />
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
        <div className="max-w-5xl mx-auto">

          {/* ── Page header ── */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('common.courses')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Master CSS step by step — complete all 6 modules to earn your certificate.
              </p>
            </div>
            <Link
              to="/final-exam"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r
                         from-amber-500 to-orange-500 text-white rounded-lg
                         hover:from-amber-600 hover:to-orange-600 transition-all font-medium"
            >
              <FiAward className="text-lg" />
              <span>{t('lms.finalExam')}</span>
            </Link>
          </div>

          {/* ── Module list ── */}
          <div className="space-y-4">
            {courseModules.map((mod, index) => {
              const state = moduleStates[index];
              const isExpanded = expandedModules.includes(mod._id);
              const progress =
                (state.completedLessons.length / mod.lessons.length) * 100;

              return (
                <div
                  key={mod._id}
                  className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm border
                             transition-all duration-200
                             ${state.isLocked
                               ? 'border-gray-200 dark:border-gray-700/60'
                               : 'border-gray-200 dark:border-gray-700'
                             }`}
                >
                  {/* ── Module header button ─────────────────────────────────
                      CHANGE: ALL modules are now clickable/expandable.
                      Locked modules show their lesson list too (read-only preview).
                  ─────────────────────────────────────────────────────────── */}
                  <button
                    type="button"
                    onClick={() => toggleModule(mod._id)}
                    className={`w-full p-5 sm:p-6 flex items-center justify-between text-left
                               rounded-xl transition-colors
                               ${state.isLocked
                                 ? 'hover:bg-gray-50/70 dark:hover:bg-gray-800/40 cursor-pointer'
                                 : 'hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'
                               }`}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-4">
                      {/* Order badge */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                                   ${state.isLocked
                                     ? 'bg-gray-100 dark:bg-gray-800'
                                     : 'bg-gradient-to-br from-blue-500 to-purple-600'
                                   }`}
                      >
                        {state.isLocked
                          ? <FiLock className="text-gray-400 text-xl" />
                          : <span className="text-white font-bold text-lg">{mod.order}</span>
                        }
                      </div>

                      {/* Title + meta */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`text-base font-semibold ${
                              state.isLocked
                                ? 'text-gray-500 dark:text-gray-400'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {mod.title}
                          </h3>
                          {getStatusIcon(state.status)}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                          {mod.description}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadgeColor(state.status)}`}
                          >
                            {getStatusText(state.status)}
                          </span>
                          {/* Always show lesson count, locked or not */}
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {state.isLocked
                              ? `${mod.lessons.length} lessons — locked`
                              : `${state.completedLessons.length}/${mod.lessons.length} ${t('lms.lessons').toLowerCase()}`
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: progress bar (unlocked) + chevron */}
                    <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                      {!state.isLocked && (
                        <div className="w-28 hidden sm:block">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full progress-fill ${
                                state.status === 'completed'
                                  ? 'bg-green-500'
                                  : state.status === 'retake-required'
                                    ? 'bg-yellow-500'
                                    : 'bg-blue-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 text-right">
                            {Math.round(progress)}%
                          </div>
                        </div>
                      )}
                      <FiChevronRight
                        className={`text-gray-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* ── Lesson list (expanded) ───────────────────────────────
                      CHANGE: Renders for ALL modules when expanded.
                      Locked-module lessons show a "disabled" look.
                  ─────────────────────────────────────────────────────────── */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 dark:border-gray-800">
                      {/* Locked-module preview banner */}
                      {state.isLocked && (
                        <div className="flex items-center gap-2 px-5 py-3
                                        bg-amber-50 dark:bg-amber-900/10
                                        border-b border-amber-100 dark:border-amber-800/30">
                          <FiLock className="text-amber-500 text-sm flex-shrink-0" />
                          <p className="text-xs text-amber-700 dark:text-amber-400">
                            <strong>Preview only</strong> — complete the previous module to unlock.
                            &nbsp;<span className="italic opacity-80">
                              Önizleme: bu modülü açmak için önceki modülü tamamlayın.
                            </span>
                          </p>
                        </div>
                      )}

                      <div className="px-5 pb-4 pt-3 space-y-1.5">
                        {getModuleLessons(mod._id).map((lesson, lessonIndex) => {
                          // ── Per-lesson state ──
                          const isCompleted =
                            state.completedLessons.includes(lesson._id);

                          // Inside an UNLOCKED module: lesson gating still applies
                          const isLessonGated =
                            !state.isLocked &&
                            lessonIndex > 0 &&
                            !state.completedLessons.includes(
                              mod.lessons[lessonIndex - 1]._id
                            );

                          const lessonScore = state.quizScores[lesson._id];

                          // ── Visual style ──
                          //  • Module locked  → muted/disabled look
                          //  • Lesson gated   → semi-locked look
                          //  • Available      → normal interactive
                          //  • Completed      → green tint
                          const rowBase = `flex items-center gap-3 px-3 py-2.5 rounded-lg
                                           transition-colors select-none`;

                          const rowStyle = state.isLocked
                            ? `${rowBase} opacity-45 cursor-not-allowed`
                            : isLessonGated
                              ? `${rowBase} opacity-60 cursor-not-allowed`
                              : isCompleted
                                ? `${rowBase} bg-green-50 dark:bg-green-900/10
                                   hover:bg-green-100 dark:hover:bg-green-900/20 cursor-pointer`
                                : `${rowBase} hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`;

                          // ── Leading icon ──
                          const leadIcon = isCompleted ? (
                            <FiCheckCircle className="text-green-500 text-base flex-shrink-0" />
                          ) : state.isLocked || isLessonGated ? (
                            <FiLock className="text-gray-400 text-base flex-shrink-0" />
                          ) : (
                            <FiBook className="text-blue-500 text-base flex-shrink-0" />
                          );

                          // ── Title colour ──
                          const titleColor = isCompleted
                            ? 'text-green-700 dark:text-green-400'
                            : state.isLocked || isLessonGated
                              ? 'text-gray-400 dark:text-gray-500 line-through-none'
                              : 'text-gray-700 dark:text-gray-300';

                          // ── Click handler ──
                          const handleClick = (e: React.MouseEvent) => {
                            // Module is locked → show modal, never navigate
                            if (state.isLocked) {
                              e.preventDefault();
                              openLockedModal(mod.title, lesson.title);
                              return;
                            }
                            // Lesson gating (within an unlocked module) → silent block
                            if (isLessonGated) {
                              e.preventDefault();
                            }
                          };

                          return (
                            <Link
                              key={lesson._id}
                              to={
                                state.isLocked || isLessonGated
                                  ? '#'
                                  : `/courses/${mod._id}/${lesson._id}`
                              }
                              className={rowStyle}
                              onClick={handleClick}
                              tabIndex={state.isLocked || isLessonGated ? -1 : 0}
                              aria-disabled={state.isLocked || isLessonGated}
                            >
                              {/* Icon */}
                              {leadIcon}

                              {/* Title + score */}
                              <span className={`text-sm font-medium flex-1 ${titleColor}`}>
                                {lesson.title}
                                {lessonScore !== undefined && (
                                  <span
                                    className={`ml-2 text-xs font-semibold ${
                                      lessonScore >= 80
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-500 dark:text-red-400'
                                    }`}
                                  >
                                    {lessonScore}%
                                  </span>
                                )}
                              </span>

                              {/* Trailing icon */}
                              {state.isLocked ? (
                                /* locked module: padlock badge */
                                <span className="text-[10px] px-1.5 py-0.5 rounded
                                                 bg-gray-200 dark:bg-gray-700
                                                 text-gray-500 dark:text-gray-400
                                                 font-medium flex-shrink-0">
                                  🔒
                                </span>
                              ) : isLessonGated ? (
                                <FiLock className="text-gray-300 dark:text-gray-600 flex-shrink-0 text-sm" />
                              ) : (
                                <FiChevronRight className="text-gray-300 dark:text-gray-600 flex-shrink-0 text-sm" />
                              )}
                            </Link>
                          );
                        })}

                        {/* Retake exam row (unlocked modules only) */}
                        {!state.isLocked && state.needsRetake && !state.retakePassed && (
                          <Link
                            to={`/courses/${mod._id}/retake`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg
                                       bg-yellow-50 dark:bg-yellow-900/10
                                       hover:bg-yellow-100 dark:hover:bg-yellow-900/20
                                       transition-colors"
                          >
                            <FiAlertTriangle className="text-yellow-500 text-base flex-shrink-0" />
                            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400 flex-1">
                              {t('lms.retakeExam')} — Avg: {Math.round(state.averageScore)}%
                            </span>
                            <FiChevronRight className="text-yellow-500 text-sm flex-shrink-0" />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Courses;
