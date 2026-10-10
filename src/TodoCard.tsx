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
      <div className="todo-card__container todo-card__container--full">
        <div className="todo-card__row todo-card__title">
          <label className="circle-check">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onChangeChecked(todo)}
            />
            <span className="circle-check__icon" aria-hidden="true"></span>
          </label>

          <h3 className={todo.completed ? "text-muted" : ""}>{todo.title}</h3>

          <button test-id="delete" onClick={() => onDelete(todo.id)}>
            <DeleteIcon />
          </button>
        </div>
        <div className="todo-card__row">
          {todo.description && (
            <p className={todo.completed ? "text-muted" : ""}>{todo.description}</p>
          )}
        </div>
      </div>
    </li>
  );
};

export default TodoCard;
