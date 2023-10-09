import { useState } from "react";
import { useLifecycleLog } from "../../../../../hooks/use-lifecycle-log";
import { taskerAction, useTaskerStore } from "../../../../../state";
import { Textarea } from "../../../../common/textarea/textarea";
import { Typography } from "../../../../common/typography/typography";
import { TaskListItemMenuDialog } from "./dialog/task-list-item-menu-dialog";

type TaskListItemReminderMenuItemProps = {
  uuid: string;
};

export function TaskListItemReminderMenuItem({
  uuid,
}: TaskListItemReminderMenuItemProps) {
  const task = useTaskerStore((state) => state.task.items[uuid]);
  const [message, setMessage] = useState(task.label);

  useLifecycleLog(TaskListItemReminderMenuItem, { uuid }, console.log);

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }

  function handleDialogSave() {
    taskerAction.task.pushTaskAction(uuid, {
      type: "notification",
      payload: {
        message,
      },
    });
  }

  return (
    <TaskListItemMenuDialog
      value="reminder"
      menuContent="Reminder"
      onSave={handleDialogSave}
    >
      <label>
        <Typography variant="body2">Message</Typography>
        <Textarea
          defaultValue={task.label}
          value={message}
          onChange={handleTextareaChange}
        />
      </label>
    </TaskListItemMenuDialog>
  );
}
