import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function SignupPage() {
  const signup = useAuthStore((s) => s.signup);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const trimmedName = displayName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError('Display name is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const errorMsg = await signup(trimmedEmail, trimmedName, password);
    setSubmitting(false);

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    // Supabase may require email confirmation
    setConfirmationSent(true);
  };

  if (confirmationSent) {
    return (
      <div className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-2xl border border-leaf-200 bg-leaf-50 p-6 md:p-8 text-center">
          <p className="text-4xl mb-4">📬</p>
          <h1 className="text-2xl font-display font-bold text-bark-900">Check your email</h1>
          <p className="mt-2 text-bark-600">
            We sent a confirmation link to <strong>{email.trim().toLowerCase()}</strong>.
            Click the link to activate your account, then{' '}
            <Link to="/login" className="text-leaf-700 font-medium hover:underline">log in</Link>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="rounded-2xl border border-bark-100 bg-white p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-display font-bold text-bark-900">Create account</h1>
        <p className="mt-1 text-bark-500">Save progress, track streaks, and earn badges.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="displayName" className="text-sm font-medium text-bark-700">Display name</label>
            <input
              id="displayName"
              type="text"
              required
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-bark-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf-300"
            />
          </div>

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

          <div>
            <label htmlFor="password" className="text-sm font-medium text-bark-700">Password</label>
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
            <label htmlFor="confirmPassword" className="text-sm font-medium text-bark-700">Confirm password</label>
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
            {submitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-sm text-bark-500">
          Already have an account?{' '}
          <Link to="/login" className="text-leaf-700 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
