import { describe, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  describe('banner variant', () => {
    it('renders with role="alert"', () => {
      const { getByRole } = render(<ErrorMessage message="Something went wrong" variant="banner" />);
      expect(getByRole('alert')).toBeInTheDocument();
      cleanup();
    });

    it('displays the message text', () => {
      const { getByText } = render(<ErrorMessage message="Network error occurred" variant="banner" />);
      expect(getByText('Network error occurred')).toBeInTheDocument();
      cleanup();
    });
  });

  describe('inline variant (default)', () => {
    it('renders with role="alert"', () => {
      const { getByRole } = render(<ErrorMessage message="Invalid input" />);
      expect(getByRole('alert')).toBeInTheDocument();
      cleanup();
    });

    it('displays the message text', () => {
      const { getByText } = render(<ErrorMessage message="Please try again" />);
      expect(getByText('Please try again')).toBeInTheDocument();
      cleanup();
    });

    it('renders as a paragraph element by default', () => {
      const { getByRole } = render(<ErrorMessage message="Error text" />);
      expect(getByRole('alert').tagName).toBe('P');
      cleanup();
    });
  });

  describe('both variants', () => {
    it('banner variant shows message text', () => {
      const { getByText } = render(<ErrorMessage message="Banner message" variant="banner" />);
      expect(getByText('Banner message')).toBeInTheDocument();
      cleanup();
    });

    it('inline variant shows message text', () => {
      const { getByText } = render(<ErrorMessage message="Inline message" variant="inline" />);
      expect(getByText('Inline message')).toBeInTheDocument();
      cleanup();
    });
  });
});
