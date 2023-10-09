import { useState } from "react";
import { taskerAction } from "../../../../../state";
import { Textarea } from "../../../../common/textarea/textarea";
import { Typography } from "../../../../common/typography/typography";
import { TaskListItemMenuDialog } from "./dialog/task-list-item-menu-dialog";

export type TaskListItemCommandMenuItemProps = { uuid: string };

export function TaskListItemCommandMenuItem({
  uuid,
}: TaskListItemCommandMenuItemProps) {
  const [command, setCommand] = useState("");

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommand(event.target.value);
  }

  function handleDialogSave() {
    taskerAction.task.pushTaskAction(uuid, {
      type: "command",
      payload: {
        cmd: command,
      },
    });
  }

  return (
    <TaskListItemMenuDialog
      value="command"
      menuContent="Command"
      onSave={handleDialogSave}
    >
      <label>
        <Typography variant="body2">Command</Typography>
        <Textarea value={command} onChange={handleTextareaChange} />
      </label>
    </TaskListItemMenuDialog>
  );
}
