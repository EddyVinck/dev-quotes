import { useEffect, useState } from "react";

// Hook
// eslint-disable-next-line
export function useLocalStorage(key: string, initialValue: unknown) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    setStoredValue(item ? JSON.parse(item) : initialValue);
  }, [initialValue, key]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  // eslint-disable-next-line
  const setValue = (value: string | Function) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
