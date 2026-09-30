import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Tab = 'home' | 'favorites' | 'profile';
export type ThemeMode = 'light' | 'dark';

const THEME_KEY = 'bookshelf:theme';

type UiState = {
  theme: ThemeMode;
  activeTab: Tab;
  selectedBookId: string | null;
  formOpen: boolean;
  editingBookId: string | null;
  loadTheme: () => Promise<void>;
  setTheme: (t: ThemeMode) => void;
  setActiveTab: (t: Tab) => void;
  selectBook: (id: string | null) => void;
  openAddForm: () => void;
  openEditForm: (id: string) => void;
  closeForm: () => void;
  reset: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  theme: 'light',
  activeTab: 'home',
  selectedBookId: null,
  formOpen: false,
  editingBookId: null,

  loadTheme: async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') set({ theme: saved });
    } catch {
      /* si falla, se queda en claro */
    }
  },
  setTheme: (theme) => {
    set({ theme });
    AsyncStorage.setItem(THEME_KEY, theme).catch(() => {});
  },
  setActiveTab: (activeTab) => set({ activeTab, selectedBookId: null }),
  selectBook: (selectedBookId) => set({ selectedBookId }),
  openAddForm: () => set({ formOpen: true, editingBookId: null }),
  openEditForm: (id) => set({ formOpen: true, editingBookId: id }),
  closeForm: () => set({ formOpen: false, editingBookId: null }),
  reset: () => set({ activeTab: 'home', selectedBookId: null, formOpen: false, editingBookId: null }),
}));
