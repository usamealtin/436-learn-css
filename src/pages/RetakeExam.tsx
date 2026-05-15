import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { getModule, PASSING_SCORE } from '@/data/courseData';
import Quiz from '@/components/Quiz';
import { FiCheck, FiX, FiAward } from 'react-icons/fi';

const RetakeExam: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { passRetake } = useProgress();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  if (!moduleId) return <div className="p-8 text-center text-gray-500">Module not found</div>;
  const mod = getModule(moduleId);
  if (!mod) return <div className="p-8 text-center text-gray-500">Module not found</div>;

  const retakeQuestions = mod.lessons.flatMap(l => l.quiz.questions.slice(0, 3));

  const handleRetakeComplete = (score: number) => {
    const passed = score >= PASSING_SCORE;
    if (passed) {
      passRetake(moduleId);
    }
    setQuizPassed(passed);
    setQuizCompleted(true);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center max-w-md ${
          quizPassed ? 'border-2 border-green-200 dark:border-green-800' : 'border-2 border-red-200 dark:border-red-800'
        }`}>
          {quizPassed ? (
            <>
              <FiCheck className="text-green-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Retake Exam Passed!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">You've unlocked the next module!</p>
              <Link to="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Back to Courses</Link>
            </>
          ) : (
            <>
              <FiX className="text-red-500 text-6xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Retake Exam Failed</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">You need at least 80% to unlock the next module.</p>
              <Link to="/courses" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Back to Courses</Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <FiAward className="text-yellow-500 text-4xl mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Module Retake Exam</h1>
          <p className="text-gray-600 dark:text-gray-400">{mod.title} — Score 80% to unlock the next module</p>
        </div>
        <Quiz
          quiz={{ questions: retakeQuestions, passingScore: PASSING_SCORE }}
          onComplete={handleRetakeComplete}
          moduleName={mod.title}
          lessonName="Retake Exam"
        />
      </div>
    </div>
  );
};

export default RetakeExam;
