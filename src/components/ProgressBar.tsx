import React from 'react';
import { FiCheck, FiLock } from 'react-icons/fi';

interface ProgressBarProps {
  current: number;
  total: number;
  passingScore?: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  passingScore = 80,
  showPercentage = true,
  size = 'md',
  variant = 'default'
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const passed = percentage >= passingScore;

  const heights = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-4'
  };

  const colors = {
    default: passed ? 'bg-green-500' : 'bg-blue-500',
    success: 'bg-green-500',
    warning: percentage > 0 ? 'bg-yellow-500' : 'bg-gray-300'
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {current} of {total}
        </span>
        {showPercentage && (
          <span className={`text-sm font-bold ${passed ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
            {percentage}%
          </span>
        )}
      </div>
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${heights[size]} overflow-hidden`}>
        <div
          className={`${heights[size]} ${colors[variant]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {passingScore && (
        <div className="relative">
          <div
            className="absolute top-0 transform -translate-y-1/2 w-0.5 h-4 bg-gray-400 dark:bg-gray-500"
            style={{ left: `${passingScore}%` }}
          />
          <span className="text-xs text-gray-400 dark:text-gray-500" style={{ marginLeft: `${Math.min(passingScore - 5, 90)}%` }}>
            {passingScore}%
          </span>
        </div>
      )}
    </div>
  );
};

// Step Progress for module lessons
interface StepProgressProps {
  steps: Array<{
    id: string;
    label: string;
    completed: boolean;
    current?: boolean;
    locked?: boolean;
  }>;
  orientation?: 'horizontal' | 'vertical';
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  orientation = 'vertical'
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : step.current
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : step.locked
                      ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500'
              }`}>
                {step.completed ? (
                  <FiCheck className="text-lg" />
                ) : step.locked ? (
                  <FiLock className="text-sm" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs mt-2 text-center max-w-[80px] ${
                step.completed ? 'text-green-600 dark:text-green-400' :
                step.current ? 'text-blue-600 dark:text-blue-400 font-medium' :
                'text-gray-500 dark:text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            step.completed
              ? 'bg-green-500 text-white'
              : step.current
                ? 'bg-blue-500 text-white'
                : step.locked
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
          }`}>
            {step.completed ? (
              <FiCheck className="text-sm" />
            ) : step.locked ? (
              <FiLock className="text-xs" />
            ) : (
              <span className="text-xs font-medium">{index + 1}</span>
            )}
          </div>
          <span className={`text-sm ${
            step.completed ? 'text-green-600 dark:text-green-400' :
            step.current ? 'text-blue-600 dark:text-blue-400 font-medium' :
            'text-gray-500 dark:text-gray-400'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
