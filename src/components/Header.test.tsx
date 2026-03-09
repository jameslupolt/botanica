import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import { Header } from './Header';
import { cleanup } from '@testing-library/react';


// Mock supabase to prevent real API calls (authStore imports it)
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  },
}));

// Mock authStore to return a default unauthenticated state
vi.mock('../store/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    profile: null,
    isAuthenticated: false,
    logout: vi.fn().mockResolvedValue(null),
  })),
}));

afterEach(() => {
  cleanup();
});

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('accessibility', () => {
    it('renders skip-to-content link with correct href', () => {
      render(<Header />);
      const skipLink = screen.getByText('Skip to content');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('mobile menu button has aria-expanded attribute', () => {
      render(<Header />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(menuButton).toHaveAttribute('aria-expanded');
    });

    it('mobile menu button aria-expanded starts as false', () => {
      render(<Header />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('mobile menu toggle', () => {
    it('aria-expanded becomes true when menu button is clicked', () => {
      render(<Header />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });

      fireEvent.click(menuButton);

      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('aria-expanded toggles back to false on second click', () => {
      render(<Header />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });

      fireEvent.click(menuButton);
      fireEvent.click(menuButton);

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('mobile menu is hidden by default', () => {
      render(<Header />);
      expect(screen.queryByText('Learning Path')).toBeInTheDocument();
      // mobile menu div should not be rendered
      expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
    });

    it('mobile menu appears after clicking toggle', () => {
      render(<Header />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      fireEvent.click(menuButton);

      expect(document.getElementById('mobile-menu')).toBeInTheDocument();
    });
  });

  describe('Escape key handler', () => {
    it('closes open mobile menu on Escape key', () => {
      render(<Header />);
      const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i });

      // Open the menu
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Press Escape
      fireEvent.keyDown(document, { key: 'Escape' });

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('unauthenticated state', () => {
    it('shows Log In link', () => {
      render(<Header />);
      expect(screen.getAllByText('Log In').length).toBeGreaterThan(0);
    });

    it('shows Sign Up link', () => {
      render(<Header />);
      expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
    });

    it('shows Learning Path link', () => {
      render(<Header />);
      expect(screen.getAllByText('Learning Path').length).toBeGreaterThan(0);
    });
  });
});
