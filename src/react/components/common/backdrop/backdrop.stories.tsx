import { Meta, StoryObj } from "@storybook/react";
import { Backdrop } from "./backdrop";

const meta = {
  title: "Backdrop",
  component: Backdrop,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Backdrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "1rem",
        }}
      >
        Hello World
      </div>
    ),
  },
};
