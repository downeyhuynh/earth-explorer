import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, read: () => T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(read);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* a school browser may block storage */
    }
  }, [key, value]);
  return [value, setValue];
}
