import { Meta, StoryObj } from "@storybook/react";
import { IconHourglassFilled, IconShieldLockFilled } from "@tabler/icons-react";
import { ToggleButton } from "./toggle-button";

const meta = {
  title: "ToggleButton",
  component: ToggleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    children: "Toggle",
  },
};

export const Icon: Story = {
  args: {
    children: <IconHourglassFilled />,
  },
};

export const IconSmall: Story = {
  args: {
    children: <IconShieldLockFilled size={16} />,
  },
};
