export const safeStorageGet = (key: string, defaultValue: string): string => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    return localStorage.getItem(key) || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};
