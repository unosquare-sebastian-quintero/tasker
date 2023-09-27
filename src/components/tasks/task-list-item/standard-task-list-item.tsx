import {
  Icon,
  IconArrowsShuffle,
  IconClockFilled,
  IconLock,
  IconLockOpen,
  IconTrash,
  TablerIconsProps,
} from "@tabler/icons-react";
import { useState } from "react";
import { Task, TaskType } from "../../../state/tasks/model";
import { IconButton } from "../../common/icon-button/icon-button";
import { MenuButton } from "../../common/menu-button/menu-button";
import { Menu, MenuProps } from "../../common/menu/menu";
import { ToggleButton } from "../../common/toggle-button/toggle-button";
import { Typography } from "../../common/typography/typography";
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
      <ToggleButton onToggle={handleLockToggleButton}>
        {isLocked ? <IconLock /> : <IconLockOpen />}
      </ToggleButton>
      <span className={styles["task-list-item__icon"]}>{icon}</span>
      <span className={styles["task-list-item__label"]}>
        <Typography variant="body1">{task.label}</Typography>
      </span>
      {menu ? (
        <MenuButton
          component={IconButton}
          variant="borderless"
          dialogTitle="Test"
          menu={menu}
        >
          <IconArrowsShuffle />
        </MenuButton>
      ) : null}
      <IconButton variant="borderless">
        <IconTrash />
      </IconButton>
    </li>
  );
}
