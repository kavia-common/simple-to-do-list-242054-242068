import React, { useMemo, useState } from "react";
import "./App.css";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { createId } from "./utils/id";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { FilterBar } from "./components/FilterBar";
import { StatsBar } from "./components/StatsBar";

const STORAGE_KEY = "todos";

/**
 * @typedef {"all" | "active" | "completed"} Filter
 */

/**
 * PUBLIC_INTERFACE
 * Retro-themed single-page to-do app with CRUD, filtering, and local persistence.
 */
function App() {
  const [todos, setTodos] = useLocalStorageState(STORAGE_KEY, []);
  const [filter, setFilter] = useState(/** @type {Filter} */ ("all"));

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  // PUBLIC_INTERFACE
  function addTodo(text) {
    const newTodo = {
      id: createId(),
      text,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }

  // PUBLIC_INTERFACE
  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t
      )
    );
  }

  // PUBLIC_INTERFACE
  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  // PUBLIC_INTERFACE
  function editTodo(id, nextText) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: nextText, updatedAt: Date.now() } : t))
    );
  }

  // PUBLIC_INTERFACE
  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  return (
    <div className="App">
      <main className="container">
        <header className="header">
          <div className="brand">
            <h1 className="title">RETRO TODO TERMINAL</h1>
            <p className="subtitle">
              Add tasks, edit in place, mark complete, delete, filter — persisted locally via{" "}
              <span className="kbd">localStorage</span>.
            </p>
          </div>

          <div className="badge" title="Keyboard tips">
            <span>Keys:</span>
            <span className="kbd">Enter</span>
            <span className="kbd">Esc</span>
          </div>
        </header>

        <section className="card" aria-label="Add task">
          <div className="cardInner">
            <TodoInput onAdd={addTodo} />
          </div>
        </section>

        <div style={{ height: 12 }} />

        <section aria-label="Tasks">
          <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
        </section>

        <div style={{ height: 12 }} />

        <section className="card" aria-label="Filters and stats">
          <div className="cardInner stack">
            <div className="rowWrap">
              <FilterBar filter={filter} onChangeFilter={setFilter} />
              <div className="muted" aria-live="polite">
                Showing <strong>{visibleTodos.length}</strong> of <strong>{todos.length}</strong>
              </div>
            </div>
            <StatsBar todos={todos} onClearCompleted={clearCompleted} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
