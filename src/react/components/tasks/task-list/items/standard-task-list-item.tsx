import {
  IconLock,
  IconLockOpen,
  type Icon,
  type TablerIconsProps,
} from "@tabler/icons-react";
import { Children, isValidElement, useState } from "react";
import { type TaskItem } from "../../../../../models/tasks";
import { ToggleButton } from "../../../common/toggle-button/toggle-button";
import { TaskListItemDeleteButton } from "./actions/task-list-item-delete-button";
import { TaskListItemEditPlaceholder } from "./content/task-list-item-edit-placeholder";
import { TaskListItemReadOnlyPlaceholder } from "./content/task-list-item-read-only-placeholder";
import { TaskListItemSelect } from "./content/task-list-item-select";
import { TaskListItemTextarea } from "./content/task-list-item-textarea";
import { TaskListItemTime } from "./content/task-list-item-time";
import styles from "./standard-task-list-item.module.scss";

function getEditActions(children: React.ReactNode) {
  return Children.map(children, (child) => {
    if (isValidElement(child) && child.type === TaskListItemEditPlaceholder) {
      return child;
    }
    return null;
  });
}

function getReadOnlyActions(children: React.ReactNode) {
  return Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      child.type === TaskListItemReadOnlyPlaceholder
    ) {
      return child;
    }
    return null;
  });
}

export type StandardTaskListItemProps = React.PropsWithChildren & {
  uuid: string;
  task: TaskItem;
  icon?: React.ReactElement<TablerIconsProps, Icon>;
};

export function StandardTaskListItem({
  uuid,
  task,
  icon,
  children,
}: StandardTaskListItemProps) {
  const readOnlyActions = getReadOnlyActions(children);
  const editActions = getEditActions(children);

  const [isLocked, setIsLocked] = useState(false);

  function handleLockToggleButton(pressed: boolean) {
    setIsLocked(pressed);
  }

  return (
    <li className={styles["task-list-item"]}>
      <ToggleButton
        aria-label={`${isLocked ? "Unlock" : "Lock"} "${task.label}"`}
        onToggle={handleLockToggleButton}
      >
        {isLocked ? <IconLock /> : <IconLockOpen />}
      </ToggleButton>

      <div className={styles["task-list-item__container"]}>{icon}</div>

      <TaskListItemTextarea uuid={uuid} isLocked={isLocked} />
      <TaskListItemSelect uuid={uuid} isLocked={isLocked} />

      <div className={styles["task-list-item__container"]}>
        {isLocked ? (
          readOnlyActions
        ) : (
          <>
            {editActions}
            <TaskListItemDeleteButton uuid={uuid} task={task} />
          </>
        )}
        <TaskListItemTime task={task} />
      </div>
    </li>
  );
}
