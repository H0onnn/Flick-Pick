export const getStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  try {
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
