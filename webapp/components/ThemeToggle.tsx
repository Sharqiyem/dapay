'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    //toggle button placeholder
    return (
      <div className="p-2 rounded-full bg-gray-200  dark:bg-gray-600 transition-colors duration-500">
        <div className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-500"
    >
      {resolvedTheme === 'light' ? (
        <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      ) : (
        <SunIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
};

ThemeToggle.propTypes = {};

export default ThemeToggle;
