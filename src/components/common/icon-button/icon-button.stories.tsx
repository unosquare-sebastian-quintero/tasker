import { Meta, StoryObj } from "@storybook/react";
import { IconLock, IconPin } from "@tabler/icons-react";
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
    children: <IconPin />,
  },
};

export const Small: Story = {
  args: {
    children: <IconLock size={16} />,
  },
};
