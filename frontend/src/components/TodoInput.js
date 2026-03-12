import React, { useEffect, useId, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Controlled input for adding new tasks.
 */
export function TodoInput({ onAdd }) {
  const inputId = useId();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input on first mount for fast entry.
    if (inputRef.current) inputRef.current.focus();
  }, []);

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please enter a task.");
      return;
    }
    onAdd(trimmed);
    setText("");
    setError("");
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <div className="stack" aria-label="Add a task">
      <label className="srOnly" htmlFor={inputId}>
        New task
      </label>
      <div className="rowWrap">
        <input
          id={inputId}
          ref={inputRef}
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") {
              setText("");
              setError("");
            }
          }}
          placeholder="Type a task… then press Enter"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          autoComplete="off"
        />
        <button type="button" className="btn btnPrimary" onClick={submit}>
          Add
        </button>
      </div>

      <div className="muted">
        Tip: <span className="kbd">Enter</span> to add, <span className="kbd">Esc</span> to clear.
      </div>

      {error ? (
        <div id={`${inputId}-error`} className="muted" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
