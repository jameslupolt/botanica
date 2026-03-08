import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function ForgotPasswordPage() {
  const resetPassword = useAuthStore((s) => s.resetPassword);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }

    setSubmitting(true);
    const errorMsg = await resetPassword(trimmedEmail);
    setSubmitting(false);

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-2xl border border-leaf-200 bg-leaf-50 p-6 md:p-8 text-center">
          <p className="text-4xl mb-4">📧</p>
          <h1 className="text-2xl font-display font-bold text-bark-900">Check your email</h1>
          <p className="mt-2 text-bark-600">
            If an account exists for <strong>{email.trim().toLowerCase()}</strong>, we sent a
            password reset link. Click the link to set a new password.
          </p>
          <Link
            to="/login"
            className="mt-4 inline-block text-leaf-700 font-medium hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="rounded-2xl border border-bark-100 bg-white p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-display font-bold text-bark-900">Reset password</h1>
        <p className="mt-1 text-bark-500">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-bark-700">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-bark-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf-300"
            />
          </div>

          {error && <p className="text-sm text-petal-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700 disabled:opacity-50"
          >
            {submitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-4 text-sm text-bark-500">
          Remember your password?{' '}
          <Link to="/login" className="text-leaf-700 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
