import type React from "react";

type TodoComposerProps = {
  title: string;
  description: string;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TodoComposer = ({
  title,
  description,
  onChangeTitle,
  onChangeDescription,
}: TodoComposerProps) => {
  return (
    <div className="todo-composer">
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
      </div>
    </div>
  );
};

export default TodoComposer;
