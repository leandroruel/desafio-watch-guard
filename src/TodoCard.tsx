import type { Todo } from "./types";
import DeleteIcon from "./icons/DeleteIcon";
import { useState } from "react";
import EditIcon from "./icons/EditIcon";

type ToDoCardProps = {
  todo: Todo;
  onChangeChecked: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
};

const TodoCard = ({ todo, onChangeChecked, onDelete, onEdit }: ToDoCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const timestamp = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
  }).format(todo.created_at);

  return (
    <li className="todo-card" data-testid={`todo-${todo.id}`}>
      <div className="todo-card__container todo-card__container--full">
        <header className="todo-card__row todo-card__header">
          <label className="circle-check" data-testid="todo-checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              aria-label={`Concluir ${todo.title}`}
              onChange={() => onChangeChecked(todo)}
            />
            <span className="circle-check__icon" aria-hidden="true"></span>
          </label>

          <h3 className={todo.completed ? "text-muted" : ""}>
            <button
              type="button"
              className="todo-card__toggle"
              aria-expanded={expanded}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {todo.title}
            </button>
          </h3>

          <button
            type="button"
            aria-label="Editar tarefa"
            data-testid="edit"
            onClick={() => onEdit(todo)}
          >
            <EditIcon />
          </button>

          <button test-id="delete" aria-label="Excluir tarefa" onClick={() => onDelete(todo.id)}>
            <DeleteIcon />
          </button>
        </header>
        <div className="todo-card__row">
          <div className={`todo-card__details ${expanded ? "todo-card__details--open" : ""}`}>
            <div className="todo-card__details-inner">
              <p className={todo.completed ? "text-muted" : ""}>
                {todo.description || "Sem descrição"}
              </p>
              <div className="todo-card__footer">
                <span className="todo-card__timestamp" title={`Criado em: ${timestamp}`}>
                  {timestamp}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoCard;
