import { type Meta, type StoryObj } from "@storybook/react";
import { Typography } from "./typography";

const meta = {
  title: "Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    children: "Heading 1",
    variant: "h1",
  },
};

export const Body1: Story = {
  args: {
    children: "Body 1",
    variant: "body1",
  },
};

export const Button: Story = {
  args: {
    children: "Button",
    variant: "button",
  },
};
