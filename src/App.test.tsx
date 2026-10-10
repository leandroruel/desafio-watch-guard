import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { beforeEach, expect, it, vi } from "vitest";
import App from "./App";
import TodoCard from "./TodoCard";

beforeEach(async () => {
  localStorage.clear();
});

it("creates a todo", async () => {
  await render(<App />);

  await page.getByPlaceholder("Digite uma tarefa").fill("Estudar inglês");

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
    />,
  );

  await page.getByRole("button").click();

  expect(onDelete).toHaveBeenCalledWith(123);
});

it("marks a todo as completed", async () => {
  await render(<App />);

  await page.getByPlaceholder("Digite uma tarefa").fill("Estudar inglês");

  await page.getByRole("button", { name: "Adicionar tarefa" }).click();

  const checkbox = page.getByRole("checkbox");

  await checkbox.click();

  await expect.element(checkbox).toBeChecked();
});

it("filters todos by title", async () => {
  await render(<App />);

  const addInput = page.getByPlaceholder("Digite uma tarefa");
  const addButton = page.getByRole("button", {
    name: "Adicionar tarefa",
  });

  await addInput.fill("Estudar React");
  await addButton.click();

  await addInput.fill("Comprar pão");
  await addButton.click();

  const searchInput = page.getByPlaceholder("Buscar tarefas");

  await searchInput.fill("React");

  await expect
    .element(
      page.getByRole("heading", {
        name: "Estudar React",
        exact: true,
      }),
    )
    .toBeInTheDocument();

  await expect
    .element(
      page.getByRole("heading", {
        name: "Comprar pão",
        exact: true,
      }),
    )
    .not.toBeInTheDocument();
});
