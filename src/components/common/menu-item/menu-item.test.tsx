import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "../menu/menu";
import { MenuItem } from "./menu-item";

test("close callback is called and focus is moved out of menu when Tab is pressed within a menu item", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <>
      <Menu onClose={onClose}>
        <MenuItem variant="default" value="option-1">
          Option 1
        </MenuItem>
        <MenuItem variant="default" value="option-2">
          Option 2
        </MenuItem>
      </Menu>
      <button>test</button>
    </>,
  );

  const option1 = screen.getByRole("menuitem", { name: "Option 1" });
  expect(option1).toHaveFocus();

  await user.tab();
  expect(onClose).toHaveBeenCalled();

  const button = screen.getByRole("button", { name: "test" });
  expect(button).toHaveFocus();
});

test("close callback is called and focus is moved out of menu when Shift+Tab is pressed within a menu item", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <>
      <button>test</button>
      <Menu onClose={onClose}>
        <MenuItem variant="default" value="option-1">
          Option 1
        </MenuItem>
        <MenuItem variant="default" value="option-2">
          Option 2
        </MenuItem>
      </Menu>
    </>,
  );

  const option1 = screen.getByRole("menuitem", { name: "Option 1" });
  expect(option1).toHaveFocus();

  await user.tab({ shift: true });
  expect(onClose).toHaveBeenCalled();

  const button = screen.getByRole("button", { name: "test" });
  expect(button).toHaveFocus();
});

test("option-selected callback is called when an item is selected", async () => {
  const user = userEvent.setup();
  const onOptionSelected = vi.fn();

  render(
    <Menu onOptionSelected={onOptionSelected}>
      <MenuItem variant="default" value="option-1">
        Option 1
      </MenuItem>
      <MenuItem variant="default" value="option-2">
        Option 2
      </MenuItem>
    </Menu>,
  );

  const option1 = screen.getByRole("menuitem", { name: "Option 1" });
  const option2 = screen.getByRole("menuitem", { name: "Option 2" });

  await user.click(option1);
  expect(onOptionSelected).toHaveBeenCalledWith("option-1");

  await user.click(option2);
  expect(onOptionSelected).toHaveBeenCalledWith("option-2");

  onOptionSelected.mockClear();

  option1.focus();
  await user.keyboard("{Enter}");
  expect(onOptionSelected).toHaveBeenCalledWith("option-1");

  onOptionSelected.mockClear();

  option2.focus();
  await user.keyboard(" ");
  expect(onOptionSelected).toHaveBeenCalledWith("option-2");
});

test("arrow down focus next item and arrow up focus previous item", async () => {
  const user = userEvent.setup();

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
  const option2 = screen.getByRole("menuitem", { name: "Option 2" });

  await user.keyboard("{ArrowDown}");
  expect(option2).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  expect(option1).toHaveFocus();
});

test("close callback is called when Escape key is pressed", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <Menu onClose={onClose}>
      <MenuItem variant="default" value="option-1">
        Option 1
      </MenuItem>
      <MenuItem variant="default" value="option-2">
        Option 2
      </MenuItem>
    </Menu>,
  );

  await user.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalled();
});
