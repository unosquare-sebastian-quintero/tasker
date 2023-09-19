import clsx from "clsx";
import { useState } from "react";
import { useInterval } from "../../hooks/use-interval";
import { TaskListTime } from "./task-list-time";
import classes from "./tasks.module.scss";

const MINUTE_IN_MS = 60_000;

export type TaskListItemProps = React.PropsWithChildren & {};

export function TaskListItem({ children }: TaskListItemProps) {
  const [seconds, setSeconds] = useState(0);
  useInterval(() => {
    setSeconds((prevSeconds) => prevSeconds + 60);
  }, MINUTE_IN_MS);

  return (
    <li className={clsx(classes["task-list__item"])}>
      {children}
      <TaskListTime seconds={seconds} />
    </li>
  );
}
