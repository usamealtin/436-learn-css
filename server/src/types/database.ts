export interface Learner {
  learner_id: string;
  session_id?: string;
  user_name?: string;
  email?: string;
  password_hash?: string;
  created_at: Date;
  last_seen_at?: Date;
}

export interface Topic {
  topic_key: string;
  title: string;
  category: string;
  order_no: number;
  is_active: boolean;
}

export interface Quiz {
  quiz_id: string;
  topic_key: string;
  title: string;
  passing_score_percent: number;
}

export interface QuizQuestion {
  question_id: string;
  quiz_id: string;
  question_text: string;
  explanation?: string;
  order_no: number;
}

export interface QuizOption {
  option_id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
}

export interface QuizAttempt {
  attempt_id: string;
  learner_id: string;
  quiz_id: string;
  started_at: Date;
  submitted_at?: Date;
  score_percent?: number;
  is_passed?: boolean;
}

export interface QuizAnswer {
  answer_id: string;
  attempt_id: string;
  question_id: string;
  chosen_option_id?: string;
  answered_at: Date;
}

export interface TopicProgress {
  learner_id: string;
  topic_key: string;
  best_score_percent: number;
  is_completed: boolean;
  completed_at?: Date;
}

export interface Certificate {
  certificate_id: string;
  learner_id: string;
  certificate_code: string;
  issued_at: Date;
  completed_topics: any;
}

export interface TestOk {
  id: string;
}