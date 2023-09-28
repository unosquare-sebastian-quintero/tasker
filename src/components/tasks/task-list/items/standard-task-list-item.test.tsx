import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { MenuItem } from "../../../common/menu-item/menu-item";
import { Menu } from "../../../common/menu/menu";
import { StandardTaskListItem } from "./standard-task-list-item";

test("lock button switchs between read-only and edit modes", async () => {
  const user = userEvent.setup();

  render(
    <ul>
      <StandardTaskListItem
        uuid="test"
        task={{ type: "stopwatch", state: "idle", label: "task", actions: [] }}
        menu={
          <Menu>
            <MenuItem variant="default" value="action-1">
              Action 1
            </MenuItem>
          </Menu>
        }
      />
    </ul>,
  );

  expect(
    screen.getByRole("button", { name: 'Set "task" actions' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: 'Delete "task"' }),
  ).toBeInTheDocument();

  const lockButton = screen.getByRole("button", { name: 'Lock "task"' });
  await user.click(lockButton);
  expect(
    screen.queryByRole("button", { name: 'Set "task" actions' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: 'Delete "task"' }),
  ).not.toBeInTheDocument();
});

test("show up the custom menu when actions button is clicked and controls menu", async () => {
  const user = userEvent.setup();

  render(
    <ul>
      <StandardTaskListItem
        uuid="test"
        task={{ type: "stopwatch", state: "idle", label: "task", actions: [] }}
        menu={
          <Menu>
            <MenuItem variant="default" value="action-1">
              Action 1
            </MenuItem>
          </Menu>
        }
      />
    </ul>,
  );

  const actionsButton = screen.getByRole("button", {
    name: 'Set "task" actions',
  });
  await user.click(actionsButton);

  const menu = screen.getByRole("menu");
  expect(menu).toBeInTheDocument();

  const closeMenuButton = screen.getByRole("button", { name: "Close" });
  await user.click(closeMenuButton);
  expect(menu).not.toBeInTheDocument();
});

test("accessibility", async () => {
  const { container } = render(
    <ul>
      <StandardTaskListItem
        uuid="test"
        task={{
          type: "stopwatch",
          state: "idle",
          label: "task",
          actions: [],
        }}
      />
    </ul>,
  );

  expect(await axe(container)).toHaveNoViolations();
});
