const API_URL = 'http://localhost:3000/api';
const CURRENT_USER_KEY = 'learn-css-current-user';

interface BackendUser {
  learner_id: string;
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  role?: 'student' | 'instructor' | 'admin';
  created_at: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

function mapUser(backendUser: BackendUser): User {
  return {
    _id: backendUser.learner_id,
    email: backendUser.email,
    username: backendUser.user_name,
    firstName: backendUser.first_name,
    lastName: backendUser.last_name,
    role: backendUser.role || 'student',
    createdAt: backendUser.created_at,
  };
}

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem(CURRENT_USER_KEY);
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  async signup(data: { 
    email: string; 
    password: string; 
    username: string; 
    firstName: string; 
    lastName: string 
  }): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Registration failed');

    localStorage.setItem(CURRENT_USER_KEY, result.token);
    return { user: mapUser(result.user), token: result.token };
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Invalid email or password');

    localStorage.setItem(CURRENT_USER_KEY, result.token);
    return { user: mapUser(result.user), token: result.token };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(CURRENT_USER_KEY);
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { ...getAuthHeader() },
      });

      if (!response.ok) {
        localStorage.removeItem(CURRENT_USER_KEY);
        return null;
      }

      const result = await response.json();
      return mapUser(result.user);
    } catch {
      return null;
    }
  },

  async getCourses(): Promise<any[]> {
    const response = await fetch(`${API_URL}/topics/courses`);
    if (!response.ok) throw new Error('Kurslar yüklenemedi');
    return await response.json();
  },

  async getCourseDetail(courseId: string): Promise<any> {
    const response = await fetch(`${API_URL}/topics/courses/${courseId}`);
    if (!response.ok) throw new Error('Kurs detayları bulunamadı');
    return await response.json();
  },

  async getUserProgress(learnerId: string): Promise<any[]> {
    const response = await fetch(`${API_URL}/progress/${learnerId}`, {
      headers: { ...getAuthHeader() }
    });
    if (!response.ok) throw new Error('İlerleme verisi alınamadı');
    return await response.json();
  },

  async updateProgress(data: { 
    learner_id: string, 
    topic_id: string, 
    progress_percent: number, 
    status: string 
  }): Promise<any> {
    const response = await fetch(`${API_URL}/progress/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async getQuiz(topicKey: string): Promise<any> {
    const response = await fetch(`${API_URL}/quizzes/${topicKey}`, {
      headers: { ...getAuthHeader() }
    });
    if (!response.ok) throw new Error('Sınav yüklenemedi');
    return await response.json();
  },

  async submitQuiz(quizData: { 
    learner_id: string, 
    quiz_id: string, 
    answers: { question_id: string, chosen_option_id: string }[] 
  }): Promise<any> {
    const response = await fetch(`${API_URL}/quizzes/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(quizData),
    });
    if (!response.ok) throw new Error('Sınav gönderilemedi');
    return await response.json();
  },

  async getCertificates(learnerId: string): Promise<any[]> {
    const response = await fetch(`${API_URL}/certificates/${learnerId}`, {
      headers: { ...getAuthHeader() }
    });
    return await response.json();
  },

  async issueCertificate(data: { learner_id: string, completed_topics: object }): Promise<any> {
    const response = await fetch(`${API_URL}/certificates/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(updates),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Update failed');
    return mapUser(result.user);
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Password change failed');
    }
  },

  async forgotPassword(email: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Password reset request failed');
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    if (!response.ok) throw new Error('Reset failed');
  }
};

export default api;