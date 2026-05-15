export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Course {
  course_id: string;
  title: string;
  description?: string;
  image_url?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  topics?: Topic[];
}

export interface Topic {
  topic_id: string;
  course_id: string;
  title: string;
  content_html?: string;
  order_no: number;
  topic_key: string;
}

export interface Quiz {
  quiz_id: string;
  topic_key: string;
  title: string;
  pass_score: number;
}

export interface QuizQuestion {
  question_id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false';
  order_no: number;
  options: QuizOption[];
}

export interface QuizOption {
  option_id: string;
  option_text: string;
}

export interface QuizSubmission {
  learner_id: string;
  quiz_id: string;
  answers: {
    question_id: string;
    chosen_option_id: string;
  }[];
}

export interface QuizAttemptResponse {
  scorePercent: number;
  isPassed: boolean;
  correctCount: number;
  totalQuestions: number;
}

export interface Progress {
  learner_id: string;
  topic_id: string;
  progress_percent: number;
  status: 'not_started' | 'in_progress' | 'completed';
  last_accessed: string;
}

export interface Certificate {
  certificate_id: string;
  learner_id: string;
  certificate_code: string;
  issued_at: string;
  completed_topics: any;
}

export interface ApiError {
  status: string;
  statusCode: number;
  message: string;
  stack?: string;
}