import clsx from "clsx";
import { Children, isValidElement, useState } from "react";
import { useControlledInterval } from "../../hooks/use-controlled-interval";
import { TaskListButton } from "./task-list-button";
import { TaskListTime } from "./task-list-time";
import classes from "./tasks.module.scss";

const MINUTE_IN_MS = 60_000;

export type TaskListItemProps = React.PropsWithChildren & {};

export function TaskListItem({ children }: TaskListItemProps) {
  const [seconds, setSeconds] = useState(0);
  const { start, stop } = useControlledInterval(() => {
    setSeconds((prevSeconds) => prevSeconds + 60);
  }, MINUTE_IN_MS);

  function handleButtonClick() {
    start();
  }

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      child.type === TaskListButton;
    }
  });

  return (
    <li className={clsx(classes["task-list__item"])}>
      <TaskListButton onClick={handleButtonClick}>{children}</TaskListButton>
      <TaskListTime seconds={seconds} />
    </li>
  );
}
