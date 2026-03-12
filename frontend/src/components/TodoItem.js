import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { formatTimestamp } from "../utils/date";

/**
 * PUBLIC_INTERFACE
 * Single todo item row with toggle, edit, and delete actions.
 */
export function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const checkboxId = useId();
  const editInputId = useId();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [error, setError] = useState("");
  const editRef = useRef(null);

  const createdLabel = useMemo(() => {
    if (!todo.createdAt) return null;
    return formatTimestamp(todo.createdAt);
  }, [todo.createdAt]);

  useEffect(() => {
    // Keep draft in sync when list updates externally.
    setDraft(todo.text);
  }, [todo.text]);

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [isEditing]);

  function startEdit() {
    setIsEditing(true);
    setError("");
    setDraft(todo.text);
  }

  function cancelEdit() {
    setIsEditing(false);
    setError("");
    setDraft(todo.text);
  }

  function saveEdit() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setError("Task cannot be empty.");
      return;
    }
    onEdit(todo.id, trimmed);
    setIsEditing(false);
    setError("");
  }

  return (
    <li className="todoItem">
      <div className="todoLeft">
        <input
          id={checkboxId}
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={todo.completed ? "Mark as not completed" : "Mark as completed"}
        />

        <div className="todoTextWrap">
          {isEditing ? (
            <>
              <label className="srOnly" htmlFor={editInputId}>
                Edit task
              </label>
              <input
                id={editInputId}
                ref={editRef}
                className="input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit();
                  if (e.key === "Escape") cancelEdit();
                }}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${editInputId}-error` : undefined}
                autoComplete="off"
              />
              {error ? (
                <div id={`${editInputId}-error`} className="muted" role="alert">
                  {error}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className={`todoText ${todo.completed ? "todoTextCompleted" : ""}`}>
                <label htmlFor={checkboxId}>{todo.text}</label>
              </div>
              <div className="todoMeta">
                {createdLabel ? <span title="Created at">⏱ {createdLabel}</span> : null}
                {todo.completed ? <span title="Status">✓ completed</span> : <span title="Status">• active</span>}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="todoActions">
        {isEditing ? (
          <>
            <button type="button" className="btn btnSmall btnPrimary" onClick={saveEdit}>
              Save
            </button>
            <button type="button" className="btn btnSmall btnGhost" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btnSmall" onClick={startEdit}>
              Edit
            </button>
            <button
              type="button"
              className="btn btnSmall btnDanger"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete task: ${todo.text}`}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
