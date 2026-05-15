import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';

export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignupData {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changeEmail: (currentPassword: string, newEmail: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });

  const refreshUser = useCallback(async () => {
    try {
      const user = await api.getCurrentUser();
      const token = localStorage.getItem('learn-css-current-user');

      if (user && token) {
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const result = await api.login(email, password);
    setState({
      user: result.user as User,
      token: result.token,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const signup = async (data: SignupData) => {
    const result = await api.signup(data);
    setState({
      user: result.user as User,
      token: result.token,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = async () => {
    await api.logout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const forgotPassword = async (email: string) => {
    await api.forgotPassword(email);
  };

  const resetPassword = async (token: string, newPassword: string) => {
    await api.resetPassword(token, newPassword);
  };

  const changeEmail = async (currentPassword: string, newEmail: string) => {
    await api.changeEmail(currentPassword, newEmail);
    await refreshUser();
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    await api.changePassword(currentPassword, newPassword);
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
      forgotPassword,
      resetPassword,
      changeEmail,
      changePassword,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
