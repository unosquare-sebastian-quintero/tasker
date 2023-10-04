import {
  IconLock,
  IconLockOpen,
  type Icon,
  type TablerIconsProps,
} from "@tabler/icons-react";
import { useState } from "react";
import { type TaskItem } from "../../../../../models/tasks";
import { type Menu, type MenuProps } from "../../../common/menu/menu";
import { ToggleButton } from "../../../common/toggle-button/toggle-button";
import { TaskListItemEditActions } from "./actions/task-list-item-edit-actions";
import { TaskListItemReadOnlyActions } from "./actions/task-list-item-read-only-actions";
import { TaskListItemContent } from "./content/task-list-item-content";
import { TaskListItemTime } from "./content/task-list-item-time";
import styles from "./standard-task-list-item.module.scss";

export type StandardTaskListItemProps = {
  uuid: string;
  task: TaskItem;
  icon?: React.ReactElement<TablerIconsProps, Icon>;
  menu?: React.ReactElement<MenuProps, typeof Menu>;
};

export function StandardTaskListItem({
  uuid,
  task,
  icon,
  menu,
}: StandardTaskListItemProps) {
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
      <span className={styles["task-list-item__icon"]}>{icon}</span>
      <TaskListItemContent uuid={uuid} isLocked={isLocked} text={task.label} />
      {!isLocked ? (
        <TaskListItemEditActions uuid={uuid} task={task} menu={menu} />
      ) : (
        <TaskListItemReadOnlyActions uuid={uuid} task={task} />
      )}
      <TaskListItemTime task={task} />
    </li>
  );
}
