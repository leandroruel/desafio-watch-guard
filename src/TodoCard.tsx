import type { Todo } from "./types";

type ToDoCardProps = {
  todo: Todo;
  onChangeChecked: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

const TodoCard = ({ todo, onChangeChecked, onDelete }: ToDoCardProps) => {
  return (
    <li className="todo-card" data-testid={`todo-${todo.id}`}>
      <h3>{todo.title}</h3>

      {todo.description && <p>{todo.description}</p>}

      <p>{new Date(todo.created_at).toLocaleString()}</p>

      <input type="checkbox" checked={todo.completed} onChange={() => onChangeChecked(todo)} />

      <button id="delete" onClick={() => onDelete(todo.id)}>
        Remove
      </button>
    </li>
  );
};

export default TodoCard;
