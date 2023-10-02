import {
  Icon,
  IconClockFilled,
  IconLock,
  IconLockOpen,
  TablerIconsProps,
} from "@tabler/icons-react";
import { useState } from "react";
import { Task, TaskType } from "../../../../../models/tasks";
import { Menu, MenuProps } from "../../../common/menu/menu";
import { ToggleButton } from "../../../common/toggle-button/toggle-button";
import { StandardTaskListItemEditActions } from "./actions/standard-task-list-item-edit-actions";
import { StandardTaskListItemReadOnlyActions } from "./actions/standard-task-list-item-read-only-actions";
import { StandardTaskListItemContent } from "./content/standard-task-list-item-content";
import styles from "./standard-task-list-item.module.scss";

const ICON_TYPE_MAP: Record<
  TaskType,
  React.ReactElement<TablerIconsProps, Icon>
> = {
  stopwatch: <IconClockFilled />,
};

export type StandardTaskListItemProps = {
  uuid: string;
  task: Task;
  menu?: React.ReactElement<MenuProps, typeof Menu>;
};

export function StandardTaskListItem({
  uuid,
  task,
  menu,
}: StandardTaskListItemProps) {
  const icon = ICON_TYPE_MAP[task.type];

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
      <StandardTaskListItemContent
        uuid={uuid}
        isLocked={isLocked}
        text={task.label}
      />
      {!isLocked ? (
        <StandardTaskListItemEditActions uuid={uuid} task={task} menu={menu} />
      ) : (
        <StandardTaskListItemReadOnlyActions uuid={uuid} task={task} />
      )}
    </li>
  );
}
