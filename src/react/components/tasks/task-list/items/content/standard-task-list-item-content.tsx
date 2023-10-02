import clsx from "clsx";
import { useStore } from "../../../../../state";
import { Textarea } from "../../../../common/textarea/textarea";
import styles from "./standard-task-list-item-content.module.scss";

export type StandardTaskListItemContentProps = {
  uuid: string;
  isLocked: boolean;
  text: string;
};

export function StandardTaskListItemContent({
  uuid,
  isLocked,
  text,
}: StandardTaskListItemContentProps) {
  const updateTask = useStore((state) => state.updateTask);

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    updateTask(uuid, {
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
        )}
        value={text}
        onChange={handleTextareaChange}
      />
    </div>
  );
}
