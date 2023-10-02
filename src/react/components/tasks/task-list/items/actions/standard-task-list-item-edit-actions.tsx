import { IconArrowsShuffle, IconTrash } from "@tabler/icons-react";
import { useStore } from "../../../../../state";
import { Task } from "../../../../../../models/tasks";
import { IconButton } from "../../../../common/icon-button/icon-button";
import { MenuButton } from "../../../../common/menu-button/menu-button";
import { Menu, MenuProps } from "../../../../common/menu/menu";

export type StandardTaskListItemEditActionsProps = {
  uuid: string;
  task: Task;
  menu?: React.ReactElement<MenuProps, typeof Menu>;
};

export function StandardTaskListItemEditActions({
  uuid,
  task,
  menu,
}: StandardTaskListItemEditActionsProps) {
  const deleteTask = useStore((state) => state.removeTask);

  function handleDeleteButtonClick() {
    deleteTask(uuid);
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
