import { type Meta, type StoryObj } from "@storybook/react";
import { MenuItem } from "../menu-item/menu-item";
import { Menu } from "./menu";

const meta = {
  title: "Menu",
  component: Menu,
  argTypes: {
    onOptionSelected: {},
    onClose: {},
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <MenuItem variant="default" value="option-1">
          Option 1
        </MenuItem>
        <MenuItem variant="default" value="option-2">
          Option 2
        </MenuItem>
      </>
    ),
  },
};
