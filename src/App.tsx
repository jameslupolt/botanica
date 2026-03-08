import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { LessonPage } from './pages/LessonPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { DrillPage } from './pages/DrillPage';
import { useAuthStore } from './store/authStore';
import { useProgressStore } from './store/progressStore';

function App() {
  const initialize = useAuthStore((s) => s.initialize);
  const authLoading = useAuthStore((s) => s.loading);
  const authError = useAuthStore((s) => s.error);
  const user = useAuthStore((s) => s.user);
  const loadProgress = useProgressStore((s) => s.loadProgress);
  const clearLocal = useProgressStore((s) => s.clearLocal);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (user) {
      loadProgress(user.id);
    } else if (!authLoading) {
      clearLocal();
    }
  }, [user, authLoading, loadProgress, clearLocal]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-leaf-50 to-white flex items-center justify-center">
        <p className="text-bark-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-leaf-50 to-white text-bark-900">
        <Header />
        {authError && (
          <div className="border-b border-petal-200 bg-petal-50">
            <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-petal-800">
              {authError}
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/lesson/:slug" element={<LessonPage />} />
          <Route
            path="/dashboard"
            element={(
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/drill"
            element={(
              <ProtectedRoute>
                <DrillPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="mt-14 border-t border-leaf-100 bg-white/70">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-bark-500 flex items-center justify-between gap-3">
            <p>Botanica</p>
            <p>Interactive botany tutorials, quizzes, and progress tracking.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
