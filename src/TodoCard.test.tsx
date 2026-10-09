// TodoCard.test.tsx
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { expect, it, vi } from "vitest";
import TodoCard from "./TodoCard";
import type { Todo } from "./types";

const todo: Todo = {
  id: 1,
  title: "Começar academia amanhã",
  description: "chegar cedo na academia às 11h da manhã",
  created_at: Date.now(),
  completed: false,
};

it("renders the todo information", async () => {
  await render(<TodoCard todo={todo} onChangeChecked={vi.fn()} onDelete={vi.fn()} />);

  await expect.element(page.getByText("Começar academia amanhã")).toBeInTheDocument();

  await expect
    .element(page.getByText("chegar cedo na academia às 11h da manhã"))
    .toBeInTheDocument();
});
