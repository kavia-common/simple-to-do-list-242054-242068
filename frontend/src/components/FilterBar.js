import React from "react";

/**
 * PUBLIC_INTERFACE
 * Filter controls for the to-do list (all/active/completed).
 */
export function FilterBar({ filter, onChangeFilter }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      <button
        type="button"
        className="btn btnSmall filterBtn"
        aria-pressed={filter === "all"}
        onClick={() => onChangeFilter("all")}
      >
        All
      </button>
      <button
        type="button"
        className="btn btnSmall filterBtn"
        aria-pressed={filter === "active"}
        onClick={() => onChangeFilter("active")}
      >
        Active
      </button>
      <button
        type="button"
        className="btn btnSmall filterBtn"
        aria-pressed={filter === "completed"}
        onClick={() => onChangeFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}
