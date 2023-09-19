import clsx from "clsx";
import classes from "./tasks.module.scss";

export type TaskListProps = React.PropsWithChildren & {};

export function TaskList({ children }: TaskListProps) {
  return <ul className={clsx(classes["task-list"])}>{children}</ul>;
}
