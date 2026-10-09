import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import type { Todo } from "./types"

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
      todos.map((item) =>
          item.id === todo.id
              ? { ...item, completed: !item.completed }
              : item
      )
  );
};

const handleDelete = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    setTodos([...todos]);
};

const filtered = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  return (
      <div className="bg-white">
          <input
              type="search"
              placeholder="Search todos..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
          />
          <form onSubmit={handleFormSubmit}>
              <input type="text" name="task" value={task} onChange={handleInput} />
              <button type="submit">Submit</button>
          </form>
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