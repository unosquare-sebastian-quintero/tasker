import { type Meta, type StoryObj } from "@storybook/react";
import { IconAlarmFilled, IconBellFilled } from "@tabler/icons-react";
import { Button } from "./button";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const PrimaryWithLeftIcon: Story = {
  args: {
    children: "Primary",
    variant: "primary",
    leftIcon: IconAlarmFilled,
  },
};

export const SecondaryWithRightIcon: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
    rightIcon: IconBellFilled,
  },
};
