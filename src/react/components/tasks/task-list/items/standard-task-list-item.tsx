import {
  IconLock,
  IconLockOpen,
  type Icon,
  type TablerIconsProps,
} from "@tabler/icons-react";
import { useState } from "react";
import { type TaskItem } from "../../../../../models/tasks";
import { useTaskerStore } from "../../../../state";
import { ToggleButton } from "../../../common/toggle-button/toggle-button";
import { TaskListItemDeleteButton } from "./buttons/task-list-item-delete-button";
import { TaskListItemTextarea } from "./content/task-list-item-textarea";
import { TaskListItemTime } from "./content/task-list-item-time";
import styles from "./standard-task-list-item.module.scss";

export type StandardTaskListItemProps = React.PropsWithChildren & {
  uuid: string;
  task: TaskItem;
  icon?: React.ReactElement<TablerIconsProps, Icon>;
  editInputs?: React.ReactNode;
  readOnlyActions?: React.ReactNode;
  editActions?: React.ReactNode;
};

export function StandardTaskListItem({
  uuid,
  task,
  icon,
  editInputs,
  readOnlyActions,
  editActions,
}: StandardTaskListItemProps) {
  const state = useTaskerStore((state) => state.task.items[uuid].state);

  const [isLockedByUser, setIsLockedByUser] = useState(false);

  const hasFinished = state === "finished";
  const isLocked = isLockedByUser || hasFinished;

  function handleLockToggleButton(pressed: boolean) {
    setIsLockedByUser(pressed);
  }

  return (
    <li className={styles["task-list-item"]}>
      <div className={styles["task-list-item__container"]}>{icon}</div>

      <TaskListItemTextarea uuid={uuid} isLocked={isLocked} />
      {!isLocked ? editInputs : null}

      <div className={styles["task-list-item__container"]}>
        {isLocked ? (
          <>
            {readOnlyActions}
            {hasFinished ? (
              <TaskListItemDeleteButton uuid={uuid} task={task} />
            ) : null}
          </>
        ) : (
          <>
            {editActions}
            <TaskListItemDeleteButton uuid={uuid} task={task} />
          </>
        )}
        <TaskListItemTime task={task} />
      </div>

      <ToggleButton
        aria-label={`${isLocked ? "Unlock" : "Lock"} "${task.label}"`}
        aria-disabled={hasFinished}
        disabled={hasFinished}
        pressed={hasFinished ? true : undefined}
        onToggle={handleLockToggleButton}
      >
        {isLocked ? <IconLock /> : <IconLockOpen />}
      </ToggleButton>
    </li>
  );
}
