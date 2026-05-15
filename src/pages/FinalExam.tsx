import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgress } from '@/hooks/useProgress';
import { finalExamQuestions, PASSING_SCORE } from '@/data/courseData';
import Quiz from '@/components/Quiz';
import CertificateView from '@/components/CertificateView';
import { useAuth } from '@/contexts/AuthContext';
import { FiAward, FiX, FiLock } from 'react-icons/fi';

const FinalExam: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { canTakeFinalExam } = useProgress();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const allowed = canTakeFinalExam();

  if (!allowed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center max-w-md">
          <FiLock className="text-gray-400 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('lms.finalExam')} Locked
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Complete all modules with an average of at least 80% to unlock the final exam.
          </p>
          <Link to="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (quizCompleted && quizPassed) {
    return <CertificateView score={finalScore} />;
  }

  if (quizCompleted && !quizPassed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center max-w-md border-2 border-red-200 dark:border-red-800">
          <FiX className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
            Final Exam Not Passed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Your score: {finalScore}%</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            You need at least 80% to earn your certificate.
          </p>
          <button
            onClick={() => {
              setQuizCompleted(false);
              setQuizStarted(true);
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mr-2"
          >
            Try Again
          </button>
          <Link to="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleFinalExamComplete = (score: number) => {
    setFinalScore(score);
    setQuizPassed(score >= PASSING_SCORE);
    setQuizCompleted(true);

    if (score >= PASSING_SCORE) {
      localStorage.setItem(`learn-css-cert-${user?._id || 'guest'}`, JSON.stringify({
        score,
        completedAt: new Date().toISOString(),
        username: user?.username || 'Student'
      }));
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 text-center max-w-lg">
          <FiAward className="text-amber-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('lms.finalExam')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            10 questions covering all CSS modules. Score 80% to earn your certificate!
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-6 text-sm text-gray-700 dark:text-gray-300">
            <p>• Covers: Fundamentals, Box Model, Flexbox, Grid, Animations, Responsive Design</p>
            <p>• 10 questions, {PASSING_SCORE}% passing score</p>
            <p>• Pass to earn a downloadable certificate</p>
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Start Final Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Final Certificate Exam</h1>
          <p className="text-gray-600 dark:text-gray-400">Score 80% to earn your certificate</p>
        </div>
        <Quiz
          quiz={{ questions: finalExamQuestions, passingScore: PASSING_SCORE }}
          onComplete={handleFinalExamComplete}
          moduleName="Final Exam"
          lessonName="Certificate Exam"
        />
      </div>
    </div>
  );
};

export default FinalExam;
