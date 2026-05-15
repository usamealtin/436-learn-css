import React, { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { QuizQuestion } from '@/types';
import { FiCheck, FiX, FiArrowRight, FiArrowLeft, FiMenu } from 'react-icons/fi';

interface QuizProps {
  quiz: {
    questions: QuizQuestion[];
    passingScore: number;
    timeLimit?: number;
  };
  onComplete: (score: number) => void;
  moduleName: string;
  lessonName: string;
}

// Sortable Item for Drag & Drop
function SortableItem({ id, content, isCorrect }: { id: string; content: string; isCorrect?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
        isDragging
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 shadow-lg'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300'
      } ${isCorrect === true ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : ''} ${isCorrect === false ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''}`}
    >
      <button
        className="touch-none cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        {...attributes}
        {...listeners}
      >
        <FiMenu className="text-lg" />
      </button>
      <span className="text-gray-700 dark:text-gray-300 flex-1">{content}</span>
    </div>
  );
}

// Code Completion Question Component
function CodeCompletionQuestion({
  question,
  userAnswer,
  onAnswerChange,
  isChecking
}: {
  question: QuizQuestion;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  isChecking: boolean;
}) {
  // Parse the question to find the blank
  const parts = question.question.split('____');

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-gray-500">code-editor</span>
        </div>
        <pre className="text-gray-300 whitespace-pre-wrap">
          {parts[0]}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={isChecking}
            className={`w-48 px-2 py-1 mx-1 rounded border-2 font-mono text-sm ${
              isChecking
                ? userAnswer.toLowerCase() === question.correctAnswer.toString().toLowerCase()
                  ? 'border-green-500 bg-green-900/30 text-green-400'
                  : 'border-red-500 bg-red-900/30 text-red-400'
                : 'border-blue-500 bg-blue-900/30 text-blue-400 focus:outline-none'
            }`}
            placeholder="your code here"
          />
          {parts[1] || ''}
        </pre>
      </div>
      {!isChecking && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Suggestions:</span>
          {question.options.slice(0, 3).map((opt) => (
            <button
              key={opt.id}
              onClick={() => onAnswerChange(opt.text)}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Drag & Drop Question Component
function DragDropQuestion({
  question,
  userOrder,
  onOrderChange,
  isChecking,
  correctOrder
}: {
  question: QuizQuestion;
  userOrder: string[];
  onOrderChange: (order: string[]) => void;
  isChecking: boolean;
  correctOrder: string[];
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = userOrder.indexOf(active.id as string);
    const newIndex = userOrder.indexOf(over.id as string);
    onOrderChange(arrayMove(userOrder, oldIndex, newIndex));
  };

  const getItemText = (id: string) => {
    const option = question.options.find(o => o.id === id);
    return option?.text || id;
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={userOrder} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {userOrder.map((id, index) => {
            const isCorrect = isChecking ? id === correctOrder[index] : undefined;
            return (
              <div key={id} className="flex items-center space-x-2">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <SortableItem
                    id={id}
                    content={getItemText(id)}
                    isCorrect={isCorrect}
                  />
                </div>
                {isChecking && (
                  isCorrect ? (
                    <FiCheck className="text-green-500 text-lg" />
                  ) : (
                    <FiX className="text-red-500 text-lg" />
                  )
                )}
              </div>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}

const Quiz: React.FC<QuizProps> = ({ quiz, onComplete, moduleName, lessonName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const questions = quiz.questions;
  const totalQuestions = questions.length;

  // Get answer options for drag-drop questions
  const getDragDropOptions = (question: QuizQuestion) => {
    return question.options.map(o => o.id);
  };

  const getCurrentAnswer = () => {
    const question = questions[currentQuestion];
    const answer = answers[question._id];

    if (question.type === 'drag-drop') {
      return (answer as string[]) || getDragDropOptions(question);
    }
    return (answer as string) || null;
  };

  const handleSelectAnswer = (answer: string) => {
    if (isChecking) return;
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion]._id]: answer
    }));
  };

  const handleDragDropOrderChange = (newOrder: string[]) => {
    if (isChecking) return;
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion]._id]: newOrder
    }));
  };

  const handleSubmitAnswer = useCallback(() => {
    setIsChecking(true);

    setTimeout(() => {
      setIsChecking(false);

      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setShowResults(true);
        // Calculate final score
        let correct = 0;
        questions.forEach((q) => {
          const answer = answers[q._id];
          if (q.type === 'drag-drop') {
            const correctOrder = q.options
              .sort((a, b) => a.id.localeCompare(b.id))
              .map(o => o.id);
            const userOrder = (answer as string[]) || getDragDropOptions(q);
            if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
              correct++;
            }
          } else if (q.type === 'code-completion') {
            if (String(answer).toLowerCase() === String(q.correctAnswer).toLowerCase()) {
              correct++;
            }
          } else {
            const correctId = q.options.find(o => o.isCorrect)?.id;
            if (answer === correctId) {
              correct++;
            }
          }
        });
        const score = Math.round((correct / totalQuestions) * 100);
        onComplete(score);
      }
    }, 800);
  }, [currentQuestion, totalQuestions, questions, answers, onComplete]);

  const isAnswerSelected = (): boolean => {
    const question = questions[currentQuestion];
    const answer = answers[question._id];
    if (question.type === 'drag-drop') return true; // Always has default order
    if (question.type === 'code-completion') return !!answer;
    return !!answer;
  };

  const getCorrectAnswerCount = () => {
    return questions.filter((q) => {
      const answer = answers[q._id];
      if (q.type === 'drag-drop') {
        const correctOrder = q.options.sort((a, b) => a.id.localeCompare(b.id)).map(o => o.id);
        return JSON.stringify(answer) === JSON.stringify(correctOrder);
      } else if (q.type === 'code-completion') {
        return String(answer).toLowerCase() === String(q.correctAnswer).toLowerCase();
      } else {
        return answer === q.options.find(o => o.isCorrect)?.id;
      }
    }).length;
  };

  if (showResults) {
    const correctCount = getCorrectAnswerCount();
    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Results Header */}
        <div className={`p-8 text-center ${passed
          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
          : 'bg-gradient-to-r from-red-500 to-rose-500'
        }`}>
          <div className="text-white">
            {passed ? (
              <FiCheck className="text-6xl mx-auto mb-4" />
            ) : (
              <FiX className="text-6xl mx-auto mb-4" />
            )}
            <h3 className="text-3xl font-bold mb-2">
              {passed ? 'Congratulations! 🎉' : 'Not Quite There Yet'}
            </h3>
            <p className="text-lg opacity-90">
              {passed ? 'You passed the quiz!' : 'Keep studying and try again!'}
            </p>
          </div>
        </div>

        {/* Score Card */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {score}%
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {correctCount} of {totalQuestions} questions correct
            </p>
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${passed ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-4 mb-8">
            <h4 className="font-semibold text-gray-900 dark:text-white">Question Review</h4>
            {questions.map((q, index) => {
              const answer = answers[q._id];
              let isCorrect = false;

              if (q.type === 'drag-drop') {
                const correctOrder = q.options.sort((a, b) => a.id.localeCompare(b.id)).map(o => o.id);
                isCorrect = JSON.stringify(answer) === JSON.stringify(correctOrder);
              } else if (q.type === 'code-completion') {
                isCorrect = String(answer).toLowerCase() === String(q.correctAnswer).toLowerCase();
              } else {
                isCorrect = answer === q.options.find(o => o.isCorrect)?.id;
              }

              return (
                <div
                  key={q._id}
                  className={`p-4 rounded-lg border ${
                    isCorrect
                      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                      : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">{q.question}</p>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {q.type === 'multiple-choice' && (
                          <>
                            Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {q.options.find(o => o.id === answer)?.text || 'Not answered'}
                            </span>
                            {!isCorrect && (
                              <span className="text-green-600 ml-2">
                                → Correct: {q.options.find(o => o.isCorrect)?.text}
                              </span>
                            )}
                          </>
                        )}
                        {q.type === 'code-completion' && (
                          <>
                            Your answer: <code className={isCorrect ? 'text-green-600' : 'text-red-600'}>{String(answer) || 'Not answered'}</code>
                            {!isCorrect && (
                              <span className="text-green-600 ml-2">
                                → Correct: <code>{String(q.correctAnswer)}</code>
                              </span>
                            )}
                          </>
                        )}
                        {q.type === 'drag-drop' && (
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {isCorrect ? 'Order is correct!' : 'Order was incorrect'}
                          </span>
                        )}
                      </div>
                      {q.explanation && (
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
                          💡 {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Retry Button */}
          {!passed && (
            <div className="text-center">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswer = getCurrentAnswer();

  // Get correct order for drag-drop questions
  const getCorrectOrder = (q: QuizQuestion) => {
    return [...q.options].sort((a, b) => a.id.localeCompare(b.id)).map(o => o.id);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestion + 1}/{totalQuestions}
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {lessonName}
            </span>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {moduleName}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
          </span>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <div className="mb-2">
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            question.type === 'multiple-choice'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              : question.type === 'drag-drop'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {question.type === 'multiple-choice' ? 'Multiple Choice' :
             question.type === 'drag-drop' ? 'Drag & Drop' : 'Code Completion'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 mt-2">
          {question.type !== 'code-completion' && question.question}
        </h3>

        {/* Question Type Renderers */}
        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = currentAnswer === option.id;
              let optionStyle = 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10';

              if (isChecking) {
                if (isSelected && option.isCorrect) {
                  optionStyle = 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-900/20';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/20';
                } else if (option.isCorrect) {
                  optionStyle = 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-900/20';
                }
              } else if (isSelected) {
                optionStyle = 'border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={isChecking}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionStyle}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : isChecking && option.isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {isChecking && option.isCorrect ? (
                        <FiCheck className="text-lg" />
                      ) : isChecking && isSelected && !option.isCorrect ? (
                        <FiX className="text-lg" />
                      ) : (
                        option.id.toUpperCase()
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'drag-drop' && (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Drag the items to arrange them in the correct order:
            </p>
            <DragDropQuestion
              question={question}
              userOrder={(currentAnswer as string[]) || getDragDropOptions(question)}
              onOrderChange={handleDragDropOrderChange}
              isChecking={isChecking}
              correctOrder={getCorrectOrder(question)}
            />
          </div>
        )}

        {question.type === 'code-completion' && (
          <CodeCompletionQuestion
            question={question}
            userAnswer={(currentAnswer as string) || ''}
            onAnswerChange={(answer) => handleSelectAnswer(answer)}
            isChecking={isChecking}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(prev => prev - 1);
              }
            }}
            disabled={currentQuestion === 0 || isChecking}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiArrowLeft />
            <span>Previous</span>
          </button>

          <button
            onClick={handleSubmitAnswer}
            disabled={!isAnswerSelected() || isChecking}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChecking ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Checking...</span>
              </>
            ) : (
              <>
                <span>{currentQuestion === totalQuestions - 1 ? 'Submit Quiz' : 'Next'}</span>
                {currentQuestion < totalQuestions - 1 && <FiArrowRight />}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
