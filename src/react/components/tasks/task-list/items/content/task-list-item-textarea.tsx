import clsx from "clsx";
import { taskerAction, useTaskerStore } from "../../../../../state";
import { Textarea } from "../../../../common/textarea/textarea";
import styles from "./task-list-item-textarea.module.scss";

export type TaskListItemTextareaProps = {
  uuid: string;
  isLocked: boolean;
};

export function TaskListItemTextarea({
  uuid,
  isLocked,
}: TaskListItemTextareaProps) {
  const state = useTaskerStore((state) => state.task.items[uuid].state);
  const text = useTaskerStore((state) => state.task.items[uuid].label);

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    taskerAction.task.updateTask(uuid, {
      label: event.target.value,
    });
  }

  return (
    <div
      className={clsx(styles["task-list-item-content"], {
        [styles["task-list-item-content--read-only"]]: isLocked,
      })}
    >
      <Textarea
        readOnly={isLocked}
        className={clsx(
          "font-sans",
          styles["task-list-item-content__textarea"],
          {
            [styles["task-list-item__textarea--finished"]]:
              state === "finished",
          },
        )}
        value={text}
        onChange={handleTextareaChange}
      />
    </div>
  );
}
