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
import { Typography } from "../../../common/typography/typography";
import { StandardTaskListItemEditActions } from "./actions/standard-task-list-item-edit-actions";
import { StandardTaskListItemReadOnlyActions } from "./actions/standard-task-list-item-read-only-actions";
import { StandardTaskListItemContent } from "./content/standard-task-list-item-content";
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
      <Typography variant="body1" className="font-sans">
        00.00
      </Typography>
    </li>
  );
}
