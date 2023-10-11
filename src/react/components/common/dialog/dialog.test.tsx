import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Dialog } from "./dialog";

test("close callback is called when backdrop is clicked", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <Dialog open={true} title="Dialog" onClose={onClose}>
      <div>test</div>
    </Dialog>,
  );

  const backdrop = screen.getByRole("presentation");
  await user.click(backdrop);
  expect(onClose).toHaveBeenCalled();
});

test("close callback is called when close button is clicked", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <Dialog open={true} title="Dialog" onClose={onClose}>
      <div>test</div>
    </Dialog>,
  );

  const closeButton = screen.getByRole("button");
  await user.click(closeButton);
  expect(onClose).toHaveBeenCalled();
});

test("accessibility", async () => {
  const { baseElement } = render(
    <Dialog open={true} title="Dialog">
      <div>Hello World</div>
    </Dialog>,
  );

  expect(await axe(baseElement)).toHaveNoViolations();
});
