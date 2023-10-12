import { type TaskItem } from "../../../../../../models/tasks";
import {
  secondsToString,
  timeNumberToString,
} from "../../../../../utilities/time-utils";
import { Typography } from "../../../../common/typography/typography";
import styles from "./task-list-item-time.module.scss";

export type TaskListItemTimeProps = {
  task: TaskItem;
};

export function TaskListItemTime({ task }: TaskListItemTimeProps) {
  return (
    <div className={styles["task-list-item-time"]}>
      <Typography variant="body1" className="font-mono">
        {task.type === "alarm"
          ? timeNumberToString(task.time)
          : secondsToString(task.time)}
      </Typography>
    </div>
  );
}
