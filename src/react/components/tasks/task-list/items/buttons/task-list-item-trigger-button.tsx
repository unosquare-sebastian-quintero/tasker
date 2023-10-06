import { IconArrowsShuffle } from "@tabler/icons-react";
import { type TaskItem } from "../../../../../../models/tasks";
import { useLifecycleLog } from "../../../../../hooks/use-lifecycle-log";
import { IconButton } from "../../../../common/icon-button/icon-button";
import { MenuButton } from "../../../../common/menu-button/menu-button";
import { type Menu, type MenuProps } from "../../../../common/menu/menu";

export type TaskListItemTriggerButtonProps = {
  uuid: string;
  task: TaskItem;
  menu: React.ReactElement<MenuProps, typeof Menu>;
};

export function TaskListItemTriggerButton({
  uuid,
  task,
  menu,
}: TaskListItemTriggerButtonProps) {
  useLifecycleLog(TaskListItemTriggerButton, { uuid, task, menu }, console.log);

  return (
    <MenuButton
      component={IconButton}
      variant="borderless"
      label={`Set "${task.label}" actions`}
      dialogTitle="Trigger an Action"
      keepMounted
      menu={menu}
    >
      <IconArrowsShuffle />
    </MenuButton>
  );
}
