import { IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";
import { type TaskItem } from "../../../../../../models/tasks";
import { IconButton } from "../../../../common/icon-button/icon-button";
import styles from "./standard-task-list-item-read-only-actions.module.scss";

export type StandardTaskListItemReadOnlyActionsProps = {
  uuid: string;
  task: TaskItem;
};

export function StandardTaskListItemReadOnlyActions({
  uuid,
  task,
}: StandardTaskListItemReadOnlyActionsProps) {
  console.log(uuid, task);
  return (
    <div className={styles.actions}>
      <IconButton variant="bordered" label="Start" size={32}>
        <IconPlayerPlay />
      </IconButton>
      <IconButton variant="bordered" label="Start" size={32}>
        <IconPlayerStop />
      </IconButton>
    </div>
  );
}
