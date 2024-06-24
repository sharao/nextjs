"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import classes from "./page.module.css";

interface Todo {
  id: number;
  text: string;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim() }]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleRemoveTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <main className={classes.main}>
      <h1>Todo Page</h1>
      <div className={classes.inputContainer}>
        <input
          type="text"
          placeholder="Add a task..."
          className={classes.addTodo}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAddTodo} className={classes.addButton}>
          Add
        </button>
      </div>
      {todos.length === 0 ? (
        <p>No todos available. Please add a task.</p>
      ) : (
        <ul className={classes.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} className={classes.todoItem}>
              {todo.text}
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                className={classes.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
