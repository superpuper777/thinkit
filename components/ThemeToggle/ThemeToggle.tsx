'use client';

import useThemeStore from '@/store/themeStore';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        className={`
        relative w-14 h-8 flex items-center rounded-full p-1 transition-colors
        ${theme === 'light' ? 'bg-[#b1b1b1]' : 'bg-[#565557]'}
        focus:outline-none focus:ring-2 bg-[#dfdfe0]
      `}
      >
        <div
          className={`
          absolute w-6 h-6 rounded-full shadow-md transform transition-transform
          flex items-center justify-center
          ${theme === 'light' ? 'translate-x-0 bg-[#e8e8e9]' : 'translate-x-6 bg-[#414142] border-solid border-white'}
        `}
        >

          {theme === 'light' ? (
            <SunIcon className='text-[#39393a]' />
          ) : (
            <MoonIcon className='text-[#ddd8d8]' />
          )}
        </div>

      </button>
    </div>
  );
};

export default ThemeToggle;