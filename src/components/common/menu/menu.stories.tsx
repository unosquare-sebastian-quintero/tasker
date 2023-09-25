import { Meta, StoryObj } from "@storybook/react";
import { MenuItem } from "../menu-item/menu-item";
import { Menu } from "./menu";

const meta = {
  title: "Menu",
  component: Menu,
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
        <MenuItem variant="default">Option 1</MenuItem>
        <MenuItem variant="default">Option 2</MenuItem>
      </>
    ),
  },
};
