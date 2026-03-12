import React from "react";
import { TodoItem } from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * Renders a list of todos with empty state.
 */
export function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="card">
        <div className="cardInner">
          <p className="muted" role="status" aria-live="polite" style={{ margin: 0 }}>
            No tasks here. Add one above to boot up your retro productivity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="list" aria-label="Task list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}
