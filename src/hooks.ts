import { useEffect, useState } from 'react';

export const useKeyBoard = (handleKeyDown: (v: KeyboardEvent) => any) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};

export const useDarkMode = () => {
  const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const darkMode = userMedia.matches;
  useEffect(() => {
    const className = 'dark';
    const element = window.document.body;
    if (darkMode) element.classList.add(className);
    else element.classList.remove(className);
  }, []);
};

export const useLocalStorage = (key: string, initialValue: any, refresh: boolean = false) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item && !refresh ? JSON.parse(item) : initialValue instanceof Function ? initialValue() : initialValue;
  });

  const setValue = (value: any) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  return [storedValue, setValue];
};
