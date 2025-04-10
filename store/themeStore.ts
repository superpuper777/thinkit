import create from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setThemeFromLocalStorage: () => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light', 

  toggleTheme: () => set((state) => {
    const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),

  setThemeFromLocalStorage: () => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      set({ theme: savedTheme });
    }
  },
}));

export default useThemeStore;
