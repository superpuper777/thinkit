'use client';

import { useEffect } from 'react';
import useThemeStore from '../store/themeStore'; // Импортируем хранилище темы

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, setThemeFromLocalStorage } = useThemeStore();
  
  useEffect(() => {
    setThemeFromLocalStorage(); 
  }, [setThemeFromLocalStorage]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
