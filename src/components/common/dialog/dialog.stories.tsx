import { Meta, StoryObj } from "@storybook/react";
import { MenuItem } from "../menu-item/menu-item";
import { Menu } from "../menu/menu";
import { Dialog } from "./dialog";

const meta = {
  title: "Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Default",
    children: "Hello World",
  },
};

export const DialogMenu: Story = {
  args: {
    title: "Select an option",
    children: (
      <Menu>
        <MenuItem variant="default" value="option-1">
          Option 1
        </MenuItem>
        <MenuItem variant="default" value="option-2">
          Option 2
        </MenuItem>
      </Menu>
    ),
  },
};
