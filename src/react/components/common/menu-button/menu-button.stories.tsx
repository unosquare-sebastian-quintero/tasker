import { Meta } from "@storybook/react";
import { Button } from "../button/button";
import { MenuItem } from "../menu-item/menu-item";
import { Menu } from "../menu/menu";
import { MenuButton } from "./menu-button";

const meta = {
  title: "MenuButton",
  component: MenuButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MenuButton>;

export default meta;

// type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    component: Button,
    variant: "secondary",
    dialogTitle: "Select",
    menu: (
      <Menu>
        <MenuItem variant="default" value="option-1">
          Option 1
        </MenuItem>
        <MenuItem variant="default" value="option-2">
          Option 2
        </MenuItem>
      </Menu>
    ),
    children: "Open",
  },
};
