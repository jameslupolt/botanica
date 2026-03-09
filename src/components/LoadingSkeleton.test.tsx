import { describe, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { LoadingSkeleton } from './LoadingSkeleton';

describe('LoadingSkeleton', () => {
  describe('default (page) variant', () => {
    it('renders with role="status"', () => {
      const { getByRole } = render(<LoadingSkeleton />);
      expect(getByRole('status')).toBeInTheDocument();
      cleanup();
    });

    it('has aria-live="polite" for accessible loading announcement', () => {
      const { getByRole } = render(<LoadingSkeleton />);
      expect(getByRole('status')).toHaveAttribute('aria-live', 'polite');
      cleanup();
    });

    it('includes screen-reader-only loading text', () => {
      const { getByText } = render(<LoadingSkeleton />);
      expect(getByText('Loading...')).toBeInTheDocument();
      cleanup();
    });
  });

  describe('page variant (explicit)', () => {
    it('renders with role="status"', () => {
      const { getByRole } = render(<LoadingSkeleton variant="page" />);
      expect(getByRole('status')).toBeInTheDocument();
      cleanup();
    });

    it('has aria-live="polite"', () => {
      const { getByRole } = render(<LoadingSkeleton variant="page" />);
      expect(getByRole('status')).toHaveAttribute('aria-live', 'polite');
      cleanup();
    });
  });

  describe('card variant', () => {
    it('renders with role="status"', () => {
      const { getByRole } = render(<LoadingSkeleton variant="card" />);
      expect(getByRole('status')).toBeInTheDocument();
      cleanup();
    });

    it('has aria-live="polite"', () => {
      const { getByRole } = render(<LoadingSkeleton variant="card" />);
      expect(getByRole('status')).toHaveAttribute('aria-live', 'polite');
      cleanup();
    });

    it('includes screen-reader-only loading text', () => {
      const { getByText } = render(<LoadingSkeleton variant="card" />);
      expect(getByText('Loading...')).toBeInTheDocument();
      cleanup();
    });
  });

  describe('inline variant', () => {
    it('renders with role="status"', () => {
      const { getByRole } = render(<LoadingSkeleton variant="inline" />);
      expect(getByRole('status')).toBeInTheDocument();
      cleanup();
    });

    it('has aria-live="polite"', () => {
      const { getByRole } = render(<LoadingSkeleton variant="inline" />);
      expect(getByRole('status')).toHaveAttribute('aria-live', 'polite');
      cleanup();
    });

    it('includes screen-reader-only loading text', () => {
      const { getByText } = render(<LoadingSkeleton variant="inline" />);
      expect(getByText('Loading...')).toBeInTheDocument();
      cleanup();
    });
  });
});
