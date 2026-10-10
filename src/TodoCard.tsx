import type { Todo } from "./types";
import DeleteIcon from "./icons/DeleteIcon";

type ToDoCardProps = {
  todo: Todo;
  onChangeChecked: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

const TodoCard = ({ todo, onChangeChecked, onDelete }: ToDoCardProps) => {
  return (
    <li className="todo-card" data-testid={`todo-${todo.id}`}>
      <label className="circle-check">
        <input type="checkbox" checked={todo.completed} onChange={() => onChangeChecked(todo)} />
        <span className="circle-check__icon" aria-hidden="true"></span>
      </label>

      <h3 className={todo.completed ? "text-muted" : ""}>{todo.title}</h3>

      <button id="delete" onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </button>
    </li>
  );
};

export default TodoCard;
