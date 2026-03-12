/**
 * Small localStorage helpers with safe JSON parse/stringify.
 */

const DEFAULT_NAMESPACE = "retroTodo";

/**
 * PUBLIC_INTERFACE
 * Read JSON from localStorage safely.
 * @param {string} key LocalStorage key (will be namespaced).
 * @param {any} fallback Value returned if missing or invalid.
 * @param {string} [namespace] Optional namespace prefix for keys.
 * @returns {any} Parsed JSON value or fallback.
 */
export function readJSON(key, fallback, namespace = DEFAULT_NAMESPACE) {
  try {
    const raw = window.localStorage.getItem(`${namespace}:${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * PUBLIC_INTERFACE
 * Write JSON to localStorage safely.
 * @param {string} key LocalStorage key (will be namespaced).
 * @param {any} value Value to store.
 * @param {string} [namespace] Optional namespace prefix for keys.
 * @returns {boolean} True if write succeeded.
 */
export function writeJSON(key, value, namespace = DEFAULT_NAMESPACE) {
  try {
    window.localStorage.setItem(`${namespace}:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
