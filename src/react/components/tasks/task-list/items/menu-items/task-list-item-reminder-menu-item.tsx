import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";
import { useLifecycleLog } from "../../../../../hooks/use-lifecycle-log";
import { taskerAction, useTaskerStore } from "../../../../../state";
import { Button } from "../../../../common/button/button";
import { Dialog } from "../../../../common/dialog/dialog";
import { MenuItem } from "../../../../common/menu-item/menu-item";
import { Textarea } from "../../../../common/textarea/textarea";
import { Typography } from "../../../../common/typography/typography";
import styles from "./styles.module.scss";

type TaskListItemReminderMenuItemProps = {
  uuid: string;
};

export function TaskListItemReminderMenuItem({
  uuid,
}: TaskListItemReminderMenuItemProps) {
  const task = useTaskerStore((state) => state.task.items[uuid]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(task.label);

  useLifecycleLog(TaskListItemReminderMenuItem, { uuid }, console.log);

  function handleMenuItemSelected() {
    setIsOpen(true);
  }

  function handleDialogClose() {
    setIsOpen(false);
  }

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
    setIsOpen(false);
  }

  return (
    <>
      <MenuItem
        variant="default"
        value="reminder"
        onOptionSelected={handleMenuItemSelected}
      >
        Reminder
      </MenuItem>
      <Dialog open={isOpen} title="Reminder Config" onClose={handleDialogClose}>
        <div className={styles.content}>
          <label>
            <Typography variant="body2">Message</Typography>
            <Textarea
              readOnly={false}
              defaultValue={task.label}
              value={message}
              onChange={handleTextareaChange}
            />
          </label>

          <Button
            variant="primary"
            fullWidth
            rightIcon={IconDeviceFloppy}
            onClick={handleDialogSave}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
}
