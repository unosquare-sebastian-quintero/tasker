import {
  type TaskItem,
  type TaskItemInitial,
  type TaskType,
} from "../../../../../../models/tasks";
import {
  secondsToString,
  timeNumberToString,
} from "../../../../../utilities/time-utils";
import { Typography } from "../../../../common/typography/typography";
import styles from "./task-list-item-time.module.scss";

function getCurrentProgress(type: TaskType, time: number, initialTime: number) {
  switch (type) {
    case "alarm":
      return 0;

    case "stopwatch":
      return 0;

    case "timer":
      return Math.floor((100 * (initialTime - time)) / initialTime);

    default:
      console.error(`Unknown type ${type}`);
      break;
  }
}

export type TaskListItemTimeProps = {
  task: TaskItem & TaskItemInitial;
};

export function TaskListItemTime({ task }: TaskListItemTimeProps) {
  console.log(task);
  const currentProgress = getCurrentProgress(
    task.type,
    task.time,
    task.initialTime,
  );
  console.log({ currentProgress });

  return (
    <div className={styles["task-list-item-time"]}>
      <label className={styles["task-list-item-time__label"]}>
        <Typography variant="body1" className="font-mono">
          {task.type === "alarm"
            ? timeNumberToString(task.time)
            : secondsToString(task.time)}
        </Typography>
        <progress
          className={styles["task-list-item-time__progress"]}
          max={100}
          value={currentProgress}
        />
      </label>
    </div>
  );
}
