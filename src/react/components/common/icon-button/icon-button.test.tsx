import { IconAxe } from "@tabler/icons-react";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { IconButton } from "./icon-button";

test("accessibility", async () => {
  const { container } = render(
    <IconButton variant="bordered" label="test">
      <IconAxe />
    </IconButton>,
  );

  expect(await axe(container)).toHaveNoViolations();
});
