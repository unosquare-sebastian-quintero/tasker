import { Meta, StoryObj } from "@storybook/react";
import { BaseButton } from "./base-button";

const meta = {
  title: "BaseButton",
  component: BaseButton,
  tags: ["autodocs"],
} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Hello World",
  },
};