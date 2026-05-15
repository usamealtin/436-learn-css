import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/hooks/useProgress';
import { courseModules } from '@/data/courseData';
import PageTransition from '@/components/PageTransition';
import ShareCard from '@/components/ShareCard';
import {
  FiTrendingUp,
  FiBookOpen,
  FiCalendar,
  FiShare2,
  FiCheck,
  FiTarget,
  FiPieChart,
  FiAward,
  FiImage,
} from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { getModuleStates, getDailyActivity, getOverallStats, canTakeFinalExam } = useProgress();

  const [showShareCard, setShowShareCard] = useState(false);

  const stats = getOverallStats();
  const moduleStates = getModuleStates();
  const activityData = getDailyActivity();
  const finalExamUnlocked = canTakeFinalExam();

  const today = new Date();
  const startDate = new Date();
  startDate.setFullYear(today.getFullYear() - 1);

  const heatmapValues = useMemo(() => {
    return activityData.map(d => ({ date: d.date, count: d.count }));
  }, [activityData]);

  return (
    <PageTransition>
      {/* Share Card modal — mounted at top level, only rendered when open */}
      {showShareCard && (
        <ShareCard
          data={{
            userName: `${user?.firstName || 'Student'} ${user?.lastName || ''}`.trim(),
            overallProgress: stats.overallProgress,
            lessonsCompleted: stats.completedLessons,
            totalLessons: stats.totalLessons,
            completedModules: stats.completedModules,
            totalModules: stats.totalModules,
            averageScore: stats.averageScore,
            streak: stats.streak,
            dailyActivity: activityData.slice(-7),
          }}
          onClose={() => setShowShareCard(false)}
        />
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* ── Welcome header ── */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {t('dashboard.welcome', { name: user?.firstName || 'Student' })}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your learning progress across all {courseModules.length} modules.
            </p>
          </div>

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<FiBookOpen />}
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              iconColor="text-blue-600 dark:text-blue-400"
              value={stats.completedLessons}
              label={`${t('dashboard.lessonsCompleted')} / ${stats.totalLessons}`}
            />
            <StatCard
              icon={<FiPieChart />}
              iconBg="bg-purple-100 dark:bg-purple-900/30"
              iconColor="text-purple-600 dark:text-purple-400"
              value={`${stats.overallProgress}%`}
              label={t('dashboard.progress')}
            />
            <StatCard
              icon={<FiTarget />}
              iconBg="bg-green-100 dark:bg-green-900/30"
              iconColor="text-green-600 dark:text-green-400"
              value={`${stats.averageScore}%`}
              label={t('dashboard.averageScore')}
            />
            <StatCard
              icon={<FiTrendingUp />}
              iconBg="bg-amber-100 dark:bg-amber-900/30"
              iconColor="text-amber-600 dark:text-amber-400"
              value={stats.streak}
              label={`${t('dashboard.currentStreak')} (${t('dashboard.days')})`}
            />
          </div>

          {/* ── Overall progress bar ── */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Progress</h3>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {stats.completedModules}/{stats.totalModules} {t('lms.modules').toLowerCase()}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full progress-fill"
                style={{ width: `${stats.overallProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{stats.completedLessons} of {stats.totalLessons} lessons completed</span>
              <span>{stats.overallProgress}%</span>
            </div>
          </div>

          {/* ── Module progress ── */}
          <div className="grid lg:grid-cols-2 gap-4 mb-8">
            {courseModules.map((mod, i) => {
              const state = moduleStates[i];
              const progress = (state.completedLessons.length / mod.lessons.length) * 100;
              return (
                <div key={mod._id} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        state.status === 'completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                          : state.status === 'locked'
                            ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                      }`}>
                        {mod.order}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{mod.title}</h3>
                    </div>
                    {state.status === 'completed' && <FiCheck className="text-green-500" />}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div className={`h-2 rounded-full progress-fill ${
                      state.status === 'completed' ? 'bg-green-500'
                        : state.status === 'locked' ? 'bg-gray-400'
                        : 'bg-blue-500'
                    }`} style={{ width: `${state.isLocked ? 0 : progress}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{state.isLocked ? 'Locked' : `${state.completedLessons.length}/${mod.lessons.length} lessons`}</span>
                    {state.averageScore > 0 && <span>Avg: {Math.round(state.averageScore)}%</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Activity heatmap ── */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <FiCalendar className="mr-2" /> {t('dashboard.activityCalendar')}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>Less</span>
                <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm" />
                <div className="w-3 h-3 bg-green-200 dark:bg-green-900/30 rounded-sm" />
                <div className="w-3 h-3 bg-green-400 dark:bg-green-700/50 rounded-sm" />
                <div className="w-3 h-3 bg-green-600 dark:bg-green-600 rounded-sm" />
                <div className="w-3 h-3 bg-green-800 dark:bg-green-500 rounded-sm" />
                <span>More</span>
              </div>
            </div>
            <div className="heatmap-container overflow-hidden">
              <CalendarHeatmap
                startDate={startDate}
                endDate={today}
                values={heatmapValues}
                classForValue={(value: { count: number } | null) => {
                  if (!value || value.count === 0) return 'color-empty';
                  return `color-github-${Math.min(value.count, 4)}`;
                }}
                showWeekdayLabels={true}
              />
            </div>
          </div>

          {/* ── Final exam banner ── */}
          {finalExamUnlocked && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 mb-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-1 flex items-center">
                    <FiAward className="mr-2" /> Final Exam Unlocked!
                  </h3>
                  <p className="text-amber-50">You've completed all modules. Take the final exam to earn your certificate.</p>
                </div>
                <Link to="/final-exam" className="px-6 py-2 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                  Take Exam
                </Link>
              </div>
            </div>
          )}

          {/* ── Share Success Graphic ── */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <FiImage className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Share Success Graphic
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Generate a beautiful progress card and share it on LinkedIn as an image.
                  Your name, progress ring, stats, and activity are all included.
                </p>
                <button
                  type="button"
                  onClick={() => setShowShareCard(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5
                             bg-gradient-to-r from-blue-600 to-[#0a66c2]
                             text-white rounded-lg font-semibold
                             hover:from-blue-700 hover:to-[#004182]
                             transition-all shadow-md hover:shadow-lg"
                >
                  <FiShare2 />
                  Generate &amp; Share Graphic
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

// ── Tiny reusable stat card ──────────────────────────────────────────────────
const StatCard: React.FC<{
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  value: React.ReactNode;
  label: string;
}> = ({ icon, iconBg, iconColor, value, label }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
    <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center mb-3`}>
      <span className={`${iconColor} text-xl`}>{icon}</span>
    </div>
    <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
  </div>
);

export default Dashboard;
