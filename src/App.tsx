import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import Courses from '@/pages/Courses';
import LessonView from '@/pages/LessonView';
import RetakeExam from '@/pages/RetakeExam';
import FinalExam from '@/pages/FinalExam';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import '@/i18n';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            {/* Public Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:moduleId/:lessonId" element={<LessonView />} />
              <Route path="courses/:moduleId/retake" element={<RetakeExam />} />
              <Route path="editor" element={<Editor />} />
              
              {/* Protected Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="final-exam"
                element={
                  <ProtectedRoute>
                    <FinalExam />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Auth Routes (without main layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
