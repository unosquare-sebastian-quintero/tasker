import classes from "./tasks.module.scss";

function formatSeconds(seconds: number) {
  const hours = seconds / 3600;
  return hours.toFixed(1);
}

export type TaskListTimeProps = { seconds: number };

export function TaskListTime({ seconds }: TaskListTimeProps) {
  return (
    <span className={classes["task-list__time"]}>{formatSeconds(seconds)}</span>
  );
}
