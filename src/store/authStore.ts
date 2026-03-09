import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useProgressStore } from './progressStore';
import { useDrillStore } from './drillStore';
import { useAchievementStore } from './achievementStore';
import type { User as SupabaseUser } from '@supabase/supabase-js';

let initPromise: Promise<void> | null = null;
let authSubscription: { unsubscribe: () => void } | null = null;

export interface Profile {
  id: string;
  displayName: string;
  email: string;
  locationLabel: string | null;
  locationLat: number | null;
  locationLng: number | null;
  createdAt: string;
}

interface AuthState {
  user: SupabaseUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, displayName: string, password: string, location?: { label: string; lat: number; lng: number }) => Promise<string | null>;
  logout: () => Promise<string | null>;
  updateProfile: (updates: Partial<Pick<Profile, 'displayName' | 'locationLabel' | 'locationLat' | 'locationLng'>>) => Promise<string | null>;
  fetchProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<string | null>;
  updatePassword: (newPassword: string) => Promise<string | null>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;
    if (initPromise) {
      await initPromise;
      return;
    }

    initPromise = (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          set({ user: session.user, isAuthenticated: true });
          await get().fetchProfile();
        } else {
          set({ user: null, profile: null, isAuthenticated: false });
        }
        set({ error: null, initialized: true });
      } catch {
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
          error: 'Unable to initialize authentication. Please refresh and try again.',
        });
      } finally {
        set({ loading: false });
      }
    })();

    await initPromise;
    initPromise = null;

    if (!authSubscription) {
      const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          set({ user: session.user, isAuthenticated: true });
          await get().fetchProfile();
        } else {
          set({ user: null, profile: null, isAuthenticated: false });
        }
      });
      authSubscription = data.subscription;
    }
  },

  fetchProfile: async () => {
    const user = get().user;
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        set({ error: error.message });
        return;
      }

      if (data) {
        set({
          profile: {
            id: data.id,
            displayName: data.display_name,
            email: user.email ?? '',
            locationLabel: data.location_label,
            locationLat: data.location_lat,
            locationLng: data.location_lng,
            createdAt: data.created_at,
          },
          error: null,
        });
      }
    } catch {
      set({ error: 'Unable to load profile right now.' });
    }
  },

  login: async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return error.message;
      return null;
    } catch {
      return 'Unable to log in right now. Please try again.';
    }
  },

  signup: async (email, displayName, password, location) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            ...(location && {
              location_label: location.label,
              location_lat: location.lat,
              location_lng: location.lng,
            }),
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      if (error) return error.message;
      return null;
    } catch {
      return 'Unable to sign up right now. Please try again.';
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return error.message;
      authSubscription?.unsubscribe();
      authSubscription = null;
      set({ user: null, profile: null, isAuthenticated: false, error: null, initialized: false });
      useProgressStore.getState().clearLocal();
      useDrillStore.getState().clearDrill();
      useAchievementStore.getState().clearAchievements();
      return null;
    } catch {
      return 'Unable to log out right now. Please try again.';
    }
  },

  updateProfile: async (updates) => {
    const user = get().user;
    if (!user) return 'User is not signed in.';

    const dbUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (updates.displayName !== undefined) dbUpdates.display_name = updates.displayName;
    if (updates.locationLabel !== undefined) dbUpdates.location_label = updates.locationLabel;
    if (updates.locationLat !== undefined) dbUpdates.location_lat = updates.locationLat;
    if (updates.locationLng !== undefined) dbUpdates.location_lng = updates.locationLng;

    try {
      const { error } = await supabase.from('profiles').update(dbUpdates).eq('id', user.id);
      if (error) return error.message;

      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : state.profile,
        error: null,
      }));
      return null;
    } catch {
      return 'Unable to save profile right now. Please try again.';
    }
  },

  resetPassword: async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) return error.message;
      return null;
    } catch {
      return 'Unable to send reset email right now. Please try again.';
    }
  },

  updatePassword: async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return error.message;
      return null;
    } catch {
      return 'Unable to update password right now. Please try again.';
    }
  },

}));
