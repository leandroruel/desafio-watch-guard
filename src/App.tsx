import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import type { Todo } from "./types";
import TodoComposer from "./TodoComposer";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [task, setTask] = useState<string>("");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleEditTodo = (todo: Todo) => {
    setTask(todo.title);
    setDescription(todo.description || "");
    setEditingId(todo.id);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!task.trim()) return;

    if (editingId !== null) {
      setTodos(
        todos.map((todo) => (todo.id === editingId ? { ...todo, title: task, description } : todo)),
      );
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title: task,
        description,
        created_at: Date.now(),
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    handleCloseComposer();
  };

  const handleCloseComposer = () => {
    setIsOpen(false);
    setTask("");
    setDescription("");
    setEditingId(null);
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

        <button type="button" className="todo-create" onClick={() => setIsOpen(true)}>
          Adicionar nova tarefa
        </button>
      </header>
      <ul className="todo-card-list">
        {filtered.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onChangeChecked={handleChangeChecked}
            onDelete={handleDelete}
            onEdit={handleEditTodo}
          />
        ))}
      </ul>

      <TodoComposer
        title={task}
        description={description}
        onChangeTitle={(event) => setTask(event.currentTarget.value)}
        onChangeDescription={(event) => setDescription(event.currentTarget.value)}
        isOpen={isOpen}
        onClose={handleCloseComposer}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
