import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Button } from "../button/button";
import { MenuItem } from "../menu-item/menu-item";
import { Menu } from "../menu/menu";
import { MenuButton } from "./menu-button";

test("accessibility", async () => {
  const user = userEvent.setup();

  const { container, baseElement } = render(
    <MenuButton
      component={Button}
      variant="primary"
      dialogTitle="Dialog"
      menu={
        <Menu>
          <MenuItem variant="default" value="option-1">
            Option 1
          </MenuItem>
          <MenuItem variant="default" value="option-2">
            Option 2
          </MenuItem>
        </Menu>
      }
    >
      Open Menu
    </MenuButton>,
  );

  expect(await axe(container)).toHaveNoViolations();

  const menuButton = screen.getByRole("button");
  await user.click(menuButton);
  expect(await axe(baseElement)).toHaveNoViolations();
});
