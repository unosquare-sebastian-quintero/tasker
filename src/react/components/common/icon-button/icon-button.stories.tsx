import { type Meta, type StoryObj } from "@storybook/react";
import { IconLock, IconPin, IconX } from "@tabler/icons-react";
import { IconButton } from "./icon-button";

const meta = {
  title: "IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "bordered",
    label: "Pin",
    children: <IconPin />,
  },
};

export const Small: Story = {
  args: {
    variant: "bordered",
    label: "Lock",
    children: <IconLock size={16} />,
  },
};

export const Borderless: Story = {
  args: {
    variant: "borderless",
    label: "X",
    children: <IconX />,
  },
};
