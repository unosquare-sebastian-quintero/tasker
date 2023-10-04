import { type TaskItem } from "../../../../../../models/tasks";
import { secondsToString } from "../../../../../utilities/time-utils";
import { Typography } from "../../../../common/typography/typography";
import styles from "./task-list-item-time.module.scss";

export type TaskListItemTimeProps = {
  task: TaskItem;
};

export function TaskListItemTime({ task }: TaskListItemTimeProps) {
  return (
    <div className={styles["task-list-item-time"]}>
      <Typography variant="body1" className="font-mono">
        {secondsToString(task.time)}
      </Typography>
    </div>
  );
}
