import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, BookOpen, LayoutDashboard, Leaf, Target } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Header() {
  const { profile, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (dropdownOpen) {
          setDropdownOpen(false);
        }
        if (mobileOpen) {
          setMobileOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [dropdownOpen, mobileOpen]);

  const handleLogout = async (): Promise<boolean> => {
    setLogoutError(null);
    const error = await logout();
    if (error) {
      setLogoutError(error);
      return false;
    }
    setDropdownOpen(false);
    navigate('/');
    return true;
  };

  const handleMobileLogout = async () => {
    const ok = await handleLogout();
    if (ok) {
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-leaf-100">

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-leaf-600 focus:text-white font-medium">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
          <Leaf className="h-6 w-6 text-leaf-600 group-hover:text-leaf-700 transition-colors" />
          <span className="font-display text-xl font-bold text-bark-900">Botanica</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/browse"
            className="flex items-center gap-1.5 text-sm font-medium text-bark-600 hover:text-leaf-700 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Learning Path
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-bark-600 hover:text-leaf-700 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}

          {isAuthenticated && (
            <Link
              to="/drill"
              className="flex items-center gap-1.5 text-sm font-medium text-bark-600 hover:text-leaf-700 transition-colors"
            >
              <Target className="h-4 w-4" />
              Drill Mode
            </Link>
          )}

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="user-menu"
                className="flex items-center gap-2 text-sm font-medium text-bark-600 hover:text-leaf-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-700 font-bold text-sm">
                  {profile?.displayName?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <span className="max-w-[120px] truncate">{profile?.displayName}</span>
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-bark-100 py-1 z-50" id="user-menu" role="menu">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-bark-600 hover:bg-leaf-50 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      role="menuitem"
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-petal-600 hover:bg-petal-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-bark-600 hover:text-leaf-700 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium px-4 py-2 rounded-xl bg-leaf-600 text-white hover:bg-leaf-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-bark-600 hover:text-bark-900"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-leaf-100 bg-white px-4 py-4 space-y-2" id="mobile-menu">
          <Link
            to="/browse"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-bark-600 hover:bg-leaf-50"
          >
            <BookOpen className="h-4 w-4" />
            Learning Path
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-bark-600 hover:bg-leaf-50"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}

          {isAuthenticated && (
            <Link
              to="/drill"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-bark-600 hover:bg-leaf-50"
            >
              <Target className="h-4 w-4" />
              Drill Mode
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-bark-600 hover:bg-leaf-50"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={handleMobileLogout}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-petal-600 hover:bg-petal-50"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2.5 rounded-xl border border-bark-200 text-bark-600 font-medium hover:bg-bark-50"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2.5 rounded-xl bg-leaf-600 text-white font-medium hover:bg-leaf-700"
              >
                Sign Up
              </Link>
            </div>
          )}
          {logoutError && <p className="px-3 pt-1 text-sm text-petal-700">{logoutError}</p>}
        </div>
      )}
    </header>
  );
}
