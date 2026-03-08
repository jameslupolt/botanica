import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectTo =
    typeof location.state === 'object' &&
    location.state !== null &&
    'from' in location.state &&
    typeof (location.state as { from?: unknown }).from === 'string'
      ? (location.state as { from: string }).from
      : '/dashboard';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const errorMsg = await login(email.trim(), password);
    setSubmitting(false);

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="rounded-2xl border border-bark-100 bg-white p-6 md:p-8 shadow-sm">
        <h1 className="text-3xl font-display font-bold text-bark-900">Log in</h1>
        <p className="mt-1 text-bark-500">Continue your botany learning journey.</p>

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

          {error && <p className="text-sm text-petal-700">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700 disabled:opacity-50"
          >
            {submitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-4 text-sm text-bark-500">
          New here?{' '}
          <Link to="/signup" className="text-leaf-700 font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
