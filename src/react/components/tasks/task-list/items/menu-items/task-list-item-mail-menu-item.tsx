import { useRef } from "react";
import { taskerAction } from "../../../../../state";
import { Input } from "../../../../common/input/input";
import { Textarea } from "../../../../common/textarea/textarea";
import { Typography } from "../../../../common/typography/typography";
import { TaskListItemMenuDialog } from "./dialog/task-list-item-menu-dialog";

export type TaskListItemMailMenuItemProps = { uuid: string };

export function TaskListItemMailMenuItem({
  uuid,
}: TaskListItemMailMenuItemProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleDialogSave() {
    const data = new FormData(formRef.current!);
    const payload = Object.fromEntries(data.entries());
    console.log(payload);

    taskerAction.task.pushTaskAction(uuid, {
      type: "mail",
      payload,
    });
  }

  return (
    <TaskListItemMenuDialog
      value="mail"
      menuContent="Mail"
      onSave={handleDialogSave}
    >
      <form ref={formRef}>
        <label>
          <Typography variant="body2">To</Typography>
          <Input type="email" name="to" />
        </label>

        <label>
          <Typography variant="body2">CC</Typography>
          <Input type="email" name="cc" />
        </label>

        <label>
          <Typography variant="body2">BCC</Typography>
          <Input type="email" name="bcc" />
        </label>

        <label>
          <Typography variant="body2">Subject</Typography>
          <Input type="text" name="subject" />
        </label>

        <label>
          <Typography variant="body2">Body</Typography>
          <Textarea name="body" />
        </label>
      </form>
    </TaskListItemMenuDialog>
  );
}
