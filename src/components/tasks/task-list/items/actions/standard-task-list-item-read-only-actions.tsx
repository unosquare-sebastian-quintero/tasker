import { IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";
import { Task } from "../../../../../state/tasks/model";
import { IconButton } from "../../../../common/icon-button/icon-button";
import { Typography } from "../../../../common/typography/typography";
import styles from "./standard-task-list-item-read-only-actions.module.scss";

export type StandardTaskListItemReadOnlyActionsProps = {
  uuid: string;
  task: Task;
};

export function StandardTaskListItemReadOnlyActions({
  uuid,
  task,
}: StandardTaskListItemReadOnlyActionsProps) {
  return (
    <div className={styles.actions}>
      <IconButton variant="bordered" label="Start" size={32}>
        <IconPlayerPlay />
      </IconButton>
      <IconButton variant="bordered" label="Start" size={32}>
        <IconPlayerStop />
      </IconButton>
      <Typography variant="body1" className="font-sans">
        00.00
      </Typography>
    </div>
  );
}
