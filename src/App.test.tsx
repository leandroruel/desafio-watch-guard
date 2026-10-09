import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { beforeEach, expect, it } from "vitest";
import App from "./App";

beforeEach(async () => {
  localStorage.clear();
});

it("creates a todo", async () => {
  await render(<App />);

  await page.getByPlaceholder("Digite uma tarefa").fill("Estudar inglês");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect.element(page.getByText("Estudar inglês")).toBeInTheDocument();
});

it("deletes a todo", async () => {
  await render(<App />);

  await page.getByPlaceholder("Digite uma tarefa").fill("Estudar inglês");

  await page.getByRole("button", { name: "Submit" }).click();

  const todos = JSON.parse(localStorage.getItem("todos") ?? "[]");

  const todo = todos.find((item: { title: string }) => item.title === "Estudar inglês");

  expect(todo).toBeDefined();

  const card = page.getByTestId(`todo-${todo.id}`);

  await card.getByRole("button", { name: "Remove" }).click();

  await expect
    .element(
      page.getByRole("heading", {
        name: "Estudar inglês",
        exact: true,
      }),
    )
    .not.toBeInTheDocument();
});

it("marks a todo as completed", async () => {
  await render(<App />);

  await page.getByPlaceholder("Digite uma tarefa").fill("Estudar inglês");

  await page.getByRole("button", { name: "Submit" }).click();

  const checkbox = page.getByRole("checkbox");

  await checkbox.click();

  await expect.element(checkbox).toBeChecked();
});

it("filters todos by title", async () => {
  await render(<App />);

  await page.getByPlaceholder("Digite uma tarefa").fill("Estudar React");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByPlaceholder("Digite uma tarefa").fill("Comprar pão");

  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByPlaceholder("Buscar tarefas").fill("React");

  await expect.element(page.getByText("Estudar React")).toBeInTheDocument();

  await expect.element(page.getByText("Comprar pão")).not.toBeInTheDocument();
});
