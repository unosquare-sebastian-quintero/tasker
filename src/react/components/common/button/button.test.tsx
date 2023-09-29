import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "./button";

test("accessibility", async () => {
  const { container } = render(<Button variant="primary">Test</Button>);

  expect(await axe(container)).toHaveNoViolations();
});
