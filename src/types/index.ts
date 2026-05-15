export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  progress: UserProgress;
  settings: UserSettings;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'tr';
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: QuizScore[];
  moduleProgress: ModuleProgress[];
  streakDays: number;
  lastActivityDate: string;
}

export interface QuizScore {
  lessonId: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

export interface ModuleProgress {
  moduleId: string;
  status: 'locked' | 'in-progress' | 'completed' | 'retake-required';
  averageScore: number;
  completedAt?: string;
}

export interface Module {
  _id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  retakeExam?: Quiz;
  isLocked: boolean;
}

export interface Lesson {
  _id: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  type: 'lesson' | 'practice';
  quiz: Quiz;
  isLocked: boolean;
}

export interface Quiz {
  _id: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  _id: string;
  question: string;
  type: 'multiple-choice' | 'drag-drop' | 'code-completion';
  options: QuizOption[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Certificate {
  _id: string;
  userId: string;
  username: string;
  overallScore: number;
  completedAt: string;
  certificateNumber: string;
}

export interface DailyActivity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface DashboardStats {
  totalLessons: number;
  completedLessons: number;
  overallProgress: number;
  averageScore: number;
  streakDays: number;
  dailyActivity: DailyActivity[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
