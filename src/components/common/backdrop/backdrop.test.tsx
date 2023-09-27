import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Backdrop } from "./backdrop";

test("close callback is called when clicked outside content", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <Backdrop onClose={onClose}>
      <div>test</div>
    </Backdrop>,
  );

  const div = screen.getByText("test");
  await user.click(div);
  expect(onClose).not.toHaveBeenCalled();

  const backdrop = screen.getByRole("presentation");
  await user.click(backdrop);
  expect(onClose).toHaveBeenCalled();
});

test("accessibility", async () => {
  const { container } = render(
    <Backdrop>
      <div>Hello World</div>
    </Backdrop>,
  );

  expect(await axe(container)).toHaveNoViolations();
});
