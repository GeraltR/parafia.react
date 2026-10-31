import { useEffect, useState } from "react";

/**
 * Returns `value` only after it has stopped changing for `delayMs`.
 * The returned setter applies a value immediately, bypassing the delay (e.g. when clearing a filter).
 */
export function useDebouncedValue<T>(value: T, delayMs: number): [T, (next: T) => void] {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return [debounced, setDebounced];
}
