import { create } from 'zustand';
import { authService, type AppUser } from '../services/authService';
import { crashlytics } from '../services/crashlytics';
import { getErrorCode, getErrorMessage } from '../utils/errors';

type AuthState = {
  user: AppUser | null;
  initializing: boolean; 
  loading: boolean;
  error: string | null;
  init: () => () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateName: (name: string) => Promise<void>;
  clearError: () => void;
};

const EXPECTED = /^auth\/(invalid|wrong|user-not-found|email-already|weak|missing|too-many|network)/;

const fail = (e: unknown, context: string) => {
  if (!EXPECTED.test(getErrorCode(e))) crashlytics.recordError(e, context);
  return getErrorMessage(e, 'No se pudo completar la operación. Inténtalo de nuevo.');
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initializing: true,
  loading: false,
  error: null,

  init: () =>
    authService.onChange((user) => {
      crashlytics.setUser(user?.uid ?? null);
      set({ user, initializing: false });
    }),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await authService.login(email, password);
    } catch (e) {
      set({ error: fail(e, 'auth:login') });
    } finally {
      set({ loading: false });
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      set({ user: await authService.register(name, email, password) });
    } catch (e) {
      set({ error: fail(e, 'auth:register') });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (e) {
      set({ error: fail(e, 'auth:logout') });
    }
  },

  updateName: async (name) => {
    try {
      set({ user: await authService.updateName(name), error: null });
    } catch (e) {
      set({ error: fail(e, 'auth:updateName') });
    }
  },

  clearError: () => set({ error: null }),
}));
