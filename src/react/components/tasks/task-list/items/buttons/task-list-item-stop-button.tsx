import { IconPlayerStop } from "@tabler/icons-react";
import { type TaskItem } from "../../../../../../models/tasks";
import { IconButton } from "../../../../common/icon-button/icon-button";

export type TaskListItemStopButtonProps = {
  uuid: string;
  task: TaskItem;
};

export function TaskListItemStopButton({
  uuid,
  task,
}: TaskListItemStopButtonProps) {
  function handleStopButtonClick() {
    console.log(uuid, task);
  }

  return (
    <IconButton
      variant="bordered"
      label="Start"
      size={32}
      onClick={handleStopButtonClick}
    >
      <IconPlayerStop />
    </IconButton>
  );
}
