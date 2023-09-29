import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { ToggleButton } from "./toggle-button";

test("call toggle callback when the button toggles", async () => {
  const user = userEvent.setup();
  const onToggle = vi.fn();

  render(<ToggleButton onToggle={onToggle} />);
  const button = screen.getByRole("button");

  expect(onToggle).not.toHaveBeenCalled();

  await user.click(button);
  expect(onToggle).toHaveBeenCalled();
});

test("accessibility", async () => {
  const user = userEvent.setup();

  const { container } = render(<ToggleButton>Test</ToggleButton>);

  expect(await axe(container)).toHaveNoViolations();

  await user.click(screen.getByRole("button"));
  expect(await axe(container)).toHaveNoViolations();
});
