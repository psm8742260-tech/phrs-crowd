export const safeStorageGet = (key: string, defaultValue: string): string => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
    const val = window.localStorage.getItem(key);
    return val !== null ? val : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const safeStorageSet = (key: string, value: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    // Ignore restricted iframe storage errors
  }
};

export const safeStorageRemove = (key: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (e) {
    // Ignore restricted iframe storage errors
  }
};
