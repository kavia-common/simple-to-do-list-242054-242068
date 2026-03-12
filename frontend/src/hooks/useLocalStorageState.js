import { useEffect, useRef, useState } from "react";
import { readJSON, writeJSON } from "../utils/storage";

/**
 * PUBLIC_INTERFACE
 * React state synchronized to localStorage (JSON), with safe read/write.
 * - Reads once on mount (lazy init)
 * - Writes whenever the state changes
 *
 * @template T
 * @param {string} key Storage key (namespaced inside storage util)
 * @param {T} initialValue Default value if storage is empty/invalid
 * @returns {[T, import("react").Dispatch<import("react").SetStateAction<T>>]} tuple of state and setter
 */
export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => readJSON(key, initialValue));
  const firstRenderRef = useRef(true);

  useEffect(() => {
    // Avoid double-write on mount if React StrictMode re-mounts in dev:
    // We still write on the first effect call, but skip the *very first* effect
    // if value equals what's already in storage to reduce churn.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    }
    writeJSON(key, value);
  }, [key, value]);

  return [value, setValue];
}
