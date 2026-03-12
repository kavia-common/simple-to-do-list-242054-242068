/**
 * ID generation utilities.
 */

/**
 * PUBLIC_INTERFACE
 * Generate a reasonably unique ID for client-side items.
 * Uses crypto.randomUUID when available, otherwise falls back to timestamp+random.
 * @returns {string} Unique-ish ID.
 */
export function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
