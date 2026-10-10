import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import type { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [task, setTask] = useState<string>("");
  const [search, setSearch] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (task.trim().length === 0) {
      alert("Please enter a value!");
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      title: task.trim(),
      description: "",
      created_at: Date.now(),
      completed: false,
    };

    setTodos([todo, ...todos]);
    setTask("");
  };

  const handleChangeChecked = (todo: Todo) => {
    setTodos(
      todos.map((item) => (item.id === todo.id ? { ...item, completed: !item.completed } : item)),
    );
  };

  const handleDelete = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  const filtered = todos.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <header className="todo-header">
        <div className="todo-header__brand">
          <div className="app-title">
            <h4>My Todo List</h4>
          </div>
          <input
            type="search"
            placeholder="Buscar tarefas"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="todo-search"
          />
        </div>

        <form className="todo-add" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="task"
            id="task-title"
            value={task}
            onChange={handleInput}
            placeholder="Digite uma tarefa"
            aria-label="Nova tarefa"
          />
          <button type="submit" className="todo-add__button" aria-label="Adicionar tarefa">
            +
          </button>
        </form>
      </header>
      <ul>
        {filtered.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onChangeChecked={handleChangeChecked}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
