import { useState, useEffect } from "react";

const DEFAULT_DELAY = 500;

export const useDebounce = <T extends any>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay ?? DEFAULT_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
