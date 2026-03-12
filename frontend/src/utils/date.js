/**
 * Date formatting helpers.
 */

/**
 * PUBLIC_INTERFACE
 * Format a timestamp for display in a compact, readable way.
 * @param {number} ts Unix epoch ms.
 * @returns {string} Human-friendly timestamp.
 */
export function formatTimestamp(ts) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));
  } catch {
    // Safe fallback
    const d = new Date(ts);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
}
