import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "./button";

test("first", () => {
  render(<Button />);

  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
});

test("accessibility", async () => {
  const { container } = render(<Button title="hello" />);

  expect(await axe(container)).toHaveNoViolations();
});
