import { IconArrowsShuffle, IconTrash } from "@tabler/icons-react";
import { type TaskItem } from "../../../../../../models/tasks";
import { taskerAction } from "../../../../../state";
import { IconButton } from "../../../../common/icon-button/icon-button";
import { MenuButton } from "../../../../common/menu-button/menu-button";
import { type Menu, type MenuProps } from "../../../../common/menu/menu";

export type StandardTaskListItemEditActionsProps = {
  uuid: string;
  task: TaskItem;
  menu?: React.ReactElement<MenuProps, typeof Menu>;
};

export function StandardTaskListItemEditActions({
  uuid,
  task,
  menu,
}: StandardTaskListItemEditActionsProps) {
  function handleDeleteButtonClick() {
    taskerAction.task.removeTask(uuid);
  }

  return (
    <>
      {menu ? (
        <MenuButton
          component={IconButton}
          variant="borderless"
          label={`Set "${task.label}" actions`}
          dialogTitle="Test"
          menu={menu}
        >
          <IconArrowsShuffle />
        </MenuButton>
      ) : null}
      <IconButton
        variant="borderless"
        label={`Delete "${task.label}"`}
        onClick={handleDeleteButtonClick}
      >
        <IconTrash />
      </IconButton>
    </>
  );
}
