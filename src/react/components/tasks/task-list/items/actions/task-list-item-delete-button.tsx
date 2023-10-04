import { IconTrash } from "@tabler/icons-react";
import { type TaskItem } from "../../../../../../models/tasks";
import { taskerAction } from "../../../../../state";
import { IconButton } from "../../../../common/icon-button/icon-button";

export type TaskListItemDeleteButtonProps = {
  uuid: string;
  task: TaskItem;
};

export function TaskListItemDeleteButton({
  uuid,
  task,
}: TaskListItemDeleteButtonProps) {
  function handleDeleteButtonClick() {
    taskerAction.task.removeTask(uuid);
  }

  return (
    <IconButton
      variant="borderless"
      label={`Delete "${task.label}"`}
      onClick={handleDeleteButtonClick}
    >
      <IconTrash />
    </IconButton>
  );
}
