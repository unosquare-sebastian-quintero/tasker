import clsx from "clsx";
import { Typography } from "../common/typography/typography";
import classes from "./tasks.module.scss";

export type TaskListButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export function TaskListButton({
  children,
  className,
  ...props
}: TaskListButtonProps) {
  return (
    <button
      {...props}
      className={clsx(className, classes["task-list__button"])}
    >
      <div className={clsx(classes["task-list__button-content"])}>
        <Typography
          variant="body1"
          className={clsx(classes["task-list__button-text"])}
        >
          Start
        </Typography>
      </div>
      {children}
    </button>
  );
}
