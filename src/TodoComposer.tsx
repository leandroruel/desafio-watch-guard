import type React from "react";

type TodoComposerProps = {
  title: string;
  description: string;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

const TodoComposer = ({
  title,
  description,
  onChangeTitle,
  onChangeDescription,
  isOpen,
  onClose,
  onSave,
}: TodoComposerProps) => {
  return (
    <div className={`todo-composer ${isOpen ? "" : "todo-compose--hidden"}`} aria-hidden={!isOpen}>
      <div className="todo-composer__container">
        <input
          type="text"
          name="title"
          placeholder="Digite o título"
          value={title}
          className="todo-composer__task-title"
          onChange={onChangeTitle}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Digite a descrição"
          className="todo-composer__task-description"
          value={description}
          onChange={onChangeDescription}
        ></textarea>
        <footer className="todo-composer__actions">
          <button
            type="button"
            className="todo-compose__cancel"
            aria-label="Cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="todo-compose__submit"
            aria-label="Adicionar tarefa"
            onClick={onSave}
          >
            Add
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TodoComposer;
