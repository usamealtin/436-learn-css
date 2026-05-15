import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PASSING_SCORE, courseModules, getModule } from '@/data/courseData';
import { DailyActivity } from '@/types';

export interface ModuleState {
  moduleId: string;
  status: 'locked' | 'in-progress' | 'completed' | 'retake-required';
  completedLessons: string[];
  quizScores: { [lessonId: string]: number };
  isLocked: boolean;
  averageScore: number;
  needsRetake: boolean;
  retakePassed: boolean;
}

export function useProgress() {
  const { user } = useAuth();

  const loadProgress = useCallback((): { [key: string]: any } => {
    const saved = localStorage.getItem(`learn-css-progress-${user?._id || 'guest'}`);
    return saved ? JSON.parse(saved) : {};
  }, [user]);

  const saveProgress = useCallback((progress: { [key: string]: any }) => {
    localStorage.setItem(`learn-css-progress-${user?._id || 'guest'}`, JSON.stringify(progress));
  }, [user]);

  const getModuleStates = useCallback((): ModuleState[] => {
    const progress = loadProgress();
    const states: ModuleState[] = [];

    for (let i = 0; i < courseModules.length; i++) {
      const mod = courseModules[i];
      const modProgress = progress[`module-${mod._id}`] || {};
      const completedLessons = modProgress.completedLessons || [];
      const quizScores = modProgress.quizScores || {};
      const retakePassed = modProgress.retakePassed || false;

      const allLessonsDone = completedLessons.length === mod.lessons.length;
      const scores = Object.values(quizScores) as number[];
      const averageScore = scores.length > 0 ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0;
      const needsRetake = allLessonsDone && averageScore < PASSING_SCORE;

      // Determine lock status
      let isLocked = false;
      if (i > 0) {
        const prevMod = states[i - 1];
        isLocked = prevMod.status !== 'completed';
      }

      let status: ModuleState['status'] = 'in-progress';
      if (isLocked) status = 'locked';
      else if (needsRetake && !retakePassed) status = 'retake-required';
      else if (allLessonsDone && (averageScore >= PASSING_SCORE || retakePassed)) status = 'completed';

      states.push({
        moduleId: mod._id,
        status,
        completedLessons,
        quizScores: quizScores as { [lessonId: string]: number },
        isLocked,
        averageScore,
        needsRetake,
        retakePassed
      });
    }

    return states;
  }, [loadProgress]);

  const isLessonLocked = useCallback((lessonId: string, moduleId: string): boolean => {
    const moduleStates = getModuleStates();
    const modState = moduleStates.find(ms => ms.moduleId === moduleId);
    if (!modState || modState.isLocked) return true;

    // Find this lesson and check all previous lessons in the same module
    const mod = getModule(moduleId);
    if (!mod) return true;

    const lessonIndex = mod.lessons.findIndex(l => l._id === lessonId);
    for (let i = 0; i < lessonIndex; i++) {
      const prevLesson = mod.lessons[i];
      if (!modState.completedLessons.includes(prevLesson._id)) {
        return true;
      }
    }
    return false;
  }, [getModuleStates]);

      const completeLesson = useCallback(async (lessonId: string, moduleId: string, score: number) => {
    const progress = loadProgress();
    const key = `module-${moduleId}`;

    if (!progress[key]) {
      progress[key] = { completedLessons: [], quizScores: {}, retakePassed: false };
    }

    if (!progress[key].quizScores) progress[key].quizScores = {};
    if (!progress[key].completedLessons) progress[key].completedLessons = [];

    progress[key].quizScores[lessonId] = score;

    if (score >= PASSING_SCORE) {
      if (!progress[key].completedLessons.includes(lessonId)) {
        progress[key].completedLessons.push(lessonId);
      }

      // Track daily activity for heatmap
      const today = new Date().toISOString().split('T')[0];
      if (!progress.activity) progress.activity = {};
      progress.activity[today] = (progress.activity[today] || 0) + 1;

      // Track streak
      if (!progress.streak) progress.streak = { current: 0, lastDate: '' };
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      if (progress.streak.lastDate === yesterdayStr || progress.streak.lastDate === today) {
        if (progress.streak.lastDate !== today) {
          progress.streak.current += 1;
        }
      } else {
        progress.streak.current = 1;
      }
      progress.streak.lastDate = today;
    }

    saveProgress(progress);
    return score >= PASSING_SCORE;
  }, [loadProgress, saveProgress]);

  const passRetake = useCallback(async (moduleId: string) => {
    const progress = loadProgress();
    const key = `module-${moduleId}`;

    if (!progress[key]) progress[key] = {};
    progress[key].retakePassed = true;

    // Track daily activity
    const today = new Date().toISOString().split('T')[0];
    if (!progress.activity) progress.activity = {};
    progress.activity[today] = (progress.activity[today] || 0) + 1;

    saveProgress(progress);
  }, [loadProgress, saveProgress]);

  const getDailyActivity = useCallback((): DailyActivity[] => {
    const progress = loadProgress();
    const activity = progress.activity || {};
    const days: DailyActivity[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = activity[dateStr] || 0;
      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;

      days.push({ date: dateStr, count, level });
    }

    return days;
  }, [loadProgress]);

  const getOverallStats = useCallback(() => {
    const progress = loadProgress();
    const states = getModuleStates();
    const totalLessons = courseModules.reduce((sum, m) => sum + m.lessons.length, 0);
    let completedLessons = 0;
    let totalScore = 0;
    let scoreCount = 0;

    for (const state of states) {
      completedLessons += state.completedLessons.length;
      for (const score of Object.values(state.quizScores)) {
        totalScore += score;
        scoreCount++;
      }
    }

    return {
      totalLessons,
      completedLessons,
      overallProgress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      averageScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0,
      streak: progress.streak?.current || 0,
      completedModules: states.filter(s => s.status === 'completed').length,
      totalModules: courseModules.length
    };
  }, [loadProgress, getModuleStates]);

  const canTakeFinalExam = useCallback((): boolean => {
    const states = getModuleStates();
    return states.every(s => s.status === 'completed');
  }, [getModuleStates]);

  return {
    getModuleStates,
    isLessonLocked,
    completeLesson,
    passRetake,
    getDailyActivity,
    getOverallStats,
    canTakeFinalExam,
    getQuizScore: useCallback((lessonId: string, moduleId: string): number | null => {
      const progress = loadProgress();
      const key = `module-${moduleId}`;
      return progress[key]?.quizScores?.[lessonId] ?? null;
    }, [loadProgress])
  };
}
