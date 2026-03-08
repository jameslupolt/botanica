import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function ResetPasswordPage() {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.loading);
  const updatePassword = useAuthStore((s) => s.updatePassword);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [expired, setExpired] = useState(false);

  // Give the Supabase client time to process the recovery token from the URL hash.
  // If no session is established after 5 seconds, the link is expired/invalid.
  useEffect(() => {
    if (user || authLoading) return;

    const timer = setTimeout(() => setExpired(true), 5000);
    return () => clearTimeout(timer);
  }, [user, authLoading]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const errorMsg = await updatePassword(password);
    setSubmitting(false);

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-2xl border border-leaf-200 bg-leaf-50 p-6 md:p-8 text-center">
          <p className="text-4xl mb-4">✅</p>
          <h1 className="text-2xl font-display font-bold text-bark-900">Password updated</h1>
          <p className="mt-2 text-bark-600">
            Your password has been reset successfully.
          </p>
          <Link
            to="/login"
            className="mt-4 inline-block rounded-xl bg-leaf-600 px-6 py-2.5 text-white font-medium hover:bg-leaf-700"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  // Waiting for the recovery token to be processed
  if (!user && !expired) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-2xl border border-bark-100 bg-white p-6 md:p-8 shadow-sm text-center">
          <p className="text-bark-500">Processing your reset link...</p>
        </div>
      </div>
    );
  }

  // No session established — link is expired or invalid
  if (!user && expired) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-2xl border border-petal-200 bg-petal-50 p-6 md:p-8 text-center">
          <p className="text-4xl mb-4">⏰</p>
          <h1 className="text-2xl font-display font-bold text-bark-900">Link expired</h1>
          <p className="mt-2 text-bark-600">
            This password reset link has expired or is invalid.
          </p>
          <Link
            to="/forgot-password"
            className="mt-4 inline-block rounded-xl bg-leaf-600 px-6 py-2.5 text-white font-medium hover:bg-leaf-700"
          >
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="rounded-2xl border border-bark-100 bg-white p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-display font-bold text-bark-900">Set new password</h1>
        <p className="mt-1 text-bark-500">Choose a new password for your account.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="text-sm font-medium text-bark-700">New password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-bark-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf-300"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-bark-700">Confirm new password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-bark-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf-300"
            />
          </div>

          {error && <p className="text-sm text-petal-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700 disabled:opacity-50"
          >
            {submitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
