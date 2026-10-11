import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import App from "./App";
import TodoCard from "./TodoCard";
import "./index.css";

beforeEach(async () => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("creates a todo", async () => {
  await render(<App />);

  await page.getByRole("button", { name: "Adicionar nova tarefa" }).click();
  await page.getByPlaceholder("Digite o título").fill("Estudar inglês");
  await page.getByPlaceholder("Digite a descrição").fill("Começar aula de inglês amanhã");
  await page.getByRole("button", { name: "Adicionar tarefa" }).click();

  await expect.element(page.getByText("Estudar inglês")).toBeInTheDocument();
});

it("deletes a todo", async () => {
  const onDelete = vi.fn();

  await render(
    <TodoCard
      todo={{
        id: 123,
        title: "Estudar inglês",
        created_at: Date.now(),
        completed: false,
      }}
      onChangeChecked={vi.fn()}
      onDelete={onDelete}
      onEdit={vi.fn()}
    />,
  );

  await page.getByRole("button", { name: "Excluir tarefa" }).click();
  expect(onDelete).toHaveBeenCalledWith(123);
});

it("marks a todo as completed", async () => {
  await render(<App />);

  await page.getByRole("button", { name: "Adicionar nova tarefa" }).click();
  await page.getByPlaceholder("Digite o título").fill("Estudar inglês");
  await page.getByPlaceholder("Digite a descrição").fill("Começar aula de inglês amanhã");
  await page.getByRole("button", { name: "Adicionar tarefa" }).click();

  const card = page.getByTestId(/^todo-\d+$/);

  await card.getByTestId("todo-checkbox").click();
  await expect.element(card.getByRole("checkbox", { includeHidden: true })).toBeChecked();
});

it("filters todos by title", async () => {
  await render(<App />);

  const addTodo = async (title: string) => {
    await page.getByRole("button", { name: "Adicionar nova tarefa" }).click();
    await page.getByPlaceholder("Digite o título").fill(title);
    await page.getByRole("button", { name: "Adicionar tarefa" }).click();
  };

  await addTodo("Estudar React");
  await addTodo("Comprar pão");

  await page.getByPlaceholder("Buscar tarefas").fill("React");

  await expect
    .element(page.getByRole("heading", { name: "Estudar React", exact: true }))
    .toBeInTheDocument();

  await expect
    .element(page.getByRole("heading", { name: "Comprar pão", exact: true }))
    .not.toBeInTheDocument();
});
