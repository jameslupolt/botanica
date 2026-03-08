import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { ALL_LESSONS } from '../data';
import { LocationPicker } from '../components/LocationPicker';

export function ProfilePage() {
  const navigate = useNavigate();
  const profile = useAuthStore((s) => s.profile);
  const logout = useAuthStore((s) => s.logout);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const completedCount = useProgressStore((s) => s.getCompletedCount());
  const averageScore = useProgressStore((s) => s.getTotalQuizAverage());
  const streak = useProgressStore((s) => s.streak);
  const resetProgress = useProgressStore((s) => s.resetProgress);

  const [displayName, setDisplayName] = useState(profile?.displayName ?? '');
  const [locationLabel, setLocationLabel] = useState(profile?.locationLabel ?? '');
  const [locationLat, setLocationLat] = useState(profile?.locationLat ?? null);
  const [locationLng, setLocationLng] = useState(profile?.locationLng ?? null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!profile) {
    return null;
  }

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSaving(true);
    const saveError = await updateProfile({
      displayName: displayName.trim() || profile.displayName,
      locationLabel: locationLabel.trim() || null,
      locationLat,
      locationLng,
    });
    setSaving(false);
    if (saveError) {
      setError(saveError);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const handleResetProgress = async () => {
    setError(null);
    const confirmed = window.confirm('Reset all progress and achievements? This cannot be undone.');
    if (confirmed) {
      try {
        await resetProgress();
      } catch {
        setError('Unable to reset progress right now. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    setError(null);
    const logoutError = await logout();
    if (logoutError) {
      setError(logoutError);
      return;
    }
    navigate('/', { replace: true });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-display font-bold text-bark-900">Profile</h1>
      <p className="mt-1 text-bark-500">Manage your account and learning progress.</p>

      <div className="mt-8 grid md:grid-cols-[1.2fr_1fr] gap-6">
        <section className="rounded-2xl border border-bark-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-display font-semibold text-bark-900">Account Details</h2>
          <form onSubmit={handleSave} className="mt-4 space-y-4">
            <div>
              <label htmlFor="displayName" className="text-sm font-medium text-bark-700">Display name</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-bark-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-leaf-300"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-bark-700">Email</label>
              <p className="mt-1.5 rounded-xl bg-bark-50 px-3 py-2.5 text-bark-600">{profile.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-bark-700">Location</label>
              <p className="text-xs text-bark-400 mt-0.5 mb-1.5">Used to show plants from your region</p>
              <LocationPicker
                value={locationLabel}
                onSelect={(result) => {
                  setLocationLabel(result.label);
                  setLocationLat(result.lat);
                  setLocationLng(result.lng);
                }}
                onClear={() => {
                  setLocationLabel('');
                  setLocationLat(null);
                  setLocationLng(null);
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-bark-700">Member since</label>
              <p className="mt-1.5 rounded-xl bg-bark-50 px-3 py-2.5 text-bark-600">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-leaf-600 px-4 py-2.5 text-white font-medium hover:bg-leaf-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {saved && <p className="text-sm text-leaf-700">Saved!</p>}
            </div>
            {error && <p className="text-sm text-petal-700">{error}</p>}
          </form>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border border-bark-100 bg-white p-5 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-bark-900">Stats</h3>
            <div className="mt-3 space-y-2 text-sm">
              <p className="flex justify-between"><span className="text-bark-500">Lessons completed</span><span className="font-medium text-bark-900">{completedCount}/{ALL_LESSONS.length}</span></p>
              <p className="flex justify-between"><span className="text-bark-500">Average quiz score</span><span className="font-medium text-bark-900">{averageScore}%</span></p>
              <p className="flex justify-between"><span className="text-bark-500">Current streak</span><span className="font-medium text-bark-900">{streak} day{streak === 1 ? '' : 's'}</span></p>
            </div>
          </div>

          <div className="rounded-2xl border border-petal-200 bg-petal-50 p-5">
            <h3 className="font-display text-lg font-semibold text-petal-900">Danger Zone</h3>
            <p className="mt-1 text-sm text-petal-800">Resetting progress removes lesson completion and achievements.</p>
            <button
              onClick={handleResetProgress}
              className="mt-3 w-full rounded-xl border border-petal-300 px-4 py-2.5 text-petal-700 font-medium hover:bg-petal-100"
            >
              Reset Progress
            </button>
            <button
              onClick={handleLogout}
              className="mt-2 w-full rounded-xl bg-bark-800 px-4 py-2.5 text-white font-medium hover:bg-bark-900"
            >
              Log Out
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
