import React, { useMemo } from "react";

/**
 * PUBLIC_INTERFACE
 * Displays counts and provides bulk actions.
 */
export function StatsBar({ todos, onClearCompleted }) {
  const { total, active, completed } = useMemo(() => {
    const totalCount = todos.length;
    const completedCount = todos.filter((t) => t.completed).length;
    const activeCount = totalCount - completedCount;
    return { total: totalCount, active: activeCount, completed: completedCount };
  }, [todos]);

  return (
    <div className="footerBar">
      <div className="badge" aria-live="polite">
        <span>
          total: <strong>{total}</strong>
        </span>
        <span>•</span>
        <span>
          active: <strong>{active}</strong>
        </span>
        <span>•</span>
        <span>
          done: <strong>{completed}</strong>
        </span>
      </div>

      <button
        type="button"
        className="btn btnSmall btnDanger"
        onClick={onClearCompleted}
        disabled={completed === 0}
        aria-disabled={completed === 0}
      >
        Clear completed
      </button>
    </div>
  );
}
