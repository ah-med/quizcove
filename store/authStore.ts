import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { AuthState, User } from '@/types/auth';

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || undefined,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at,
        };

        get().setUser(user);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ isLoading: true });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || undefined,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at,
        };

        get().setUser(user);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      get().setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createAnonymousUser: async () => {
    try {
      set({ isLoading: true });

      // Generate a unique anonymous ID
      const anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Store anonymous user in localStorage for now
      // In a real app, you might want to store this in a separate table
      const anonymousUser = {
        id: anonymousId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      localStorage.setItem('anonymousUser', JSON.stringify(anonymousUser));

      set({ isLoading: false });
      return anonymousId;
    } catch (error) {
      console.error('Create anonymous user error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  linkAnonymousUser: async (email: string, password: string) => {
    try {
      set({ isLoading: true });

      // First, create the account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Get the anonymous user data
        const anonymousUserData = localStorage.getItem('anonymousUser');
        const anonymousQuizHistory = localStorage.getItem('quizHistory');

        if (anonymousUserData && anonymousQuizHistory) {
          // Here you would typically migrate the anonymous user's data
          // to the authenticated user's account in your database
          // For now, we'll just clear the anonymous data
          localStorage.removeItem('anonymousUser');
          localStorage.removeItem('quizHistory');
        }

        const user: User = {
          id: data.user.id,
          email: data.user.email || undefined,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at,
        };

        get().setUser(user);
      }
    } catch (error) {
      console.error('Link anonymous user error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
