export const saveToLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};
