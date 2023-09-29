import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { MenuItem } from "../menu-item/menu-item";
import { Menu } from "./menu";

test("first item is focused on mount", () => {
  render(
    <Menu>
      <MenuItem variant="default" value="option-1">
        Option 1
      </MenuItem>
      <MenuItem variant="default" value="option-2">
        Option 2
      </MenuItem>
    </Menu>,
  );

  const option1 = screen.getByRole("menuitem", { name: "Option 1" });
  expect(option1).toHaveFocus();
});

test("accessibility", async () => {
  const { container } = render(
    <Menu>
      <MenuItem variant="default" value="option-1">
        Option 1
      </MenuItem>
    </Menu>,
  );

  expect(await axe(container)).toHaveNoViolations();
});
