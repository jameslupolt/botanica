import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { useAuthStore } from './store/authStore';
import { useProgressStore } from './store/progressStore';
import { useDrillStore } from './store/drillStore';
import { useAchievementStore } from './store/achievementStore';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const BrowsePage = lazy(() => import('./pages/BrowsePage').then(m => ({ default: m.BrowsePage })));
const LessonPage = lazy(() => import('./pages/LessonPage').then(m => ({ default: m.LessonPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const DrillPage = lazy(() => import('./pages/DrillPage').then(m => ({ default: m.DrillPage })));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));

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
      useDrillStore.getState().loadDrill(user.id);
    } else if (!authLoading) {
      clearLocal();
      useDrillStore.getState().clearDrill();
      useAchievementStore.getState().clearAchievements();
    }
  }, [user, authLoading, loadProgress, clearLocal]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-leaf-50 to-white flex items-center justify-center" role="status" aria-live="polite">
        <p className="text-bark-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-leaf-50 to-white text-bark-900">
        <Header />
        {authError && (
          <div className="border-b border-petal-200 bg-petal-50" role="alert">
            <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-petal-800">
              {authError}
            </div>
          </div>
        )}
        <main id="main-content">
          <Suspense fallback={<LoadingSkeleton variant="page" />}>
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
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
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
          </Suspense>
        </main>
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
