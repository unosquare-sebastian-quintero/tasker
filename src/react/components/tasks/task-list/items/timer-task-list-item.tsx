import { IconBellFilled } from "@tabler/icons-react";
import { MenuItem } from "../../../common/menu-item/menu-item";
import { Menu } from "../../../common/menu/menu";
import { TaskListItemPlayPauseButton } from "./actions/task-list-item-play-pause-button";
import { TaskListItemTriggerButton } from "./actions/task-list-item-trigger-button";
import { TaskListItemEditPlaceholder } from "./content/task-list-item-edit-placeholder";
import { TaskListItemReadOnlyPlaceholder } from "./content/task-list-item-read-only-placeholder";
import {
  StandardTaskListItem,
  type StandardTaskListItemProps,
} from "./standard-task-list-item";

export type TimerTaskListItemProps = StandardTaskListItemProps;

export function TimerTaskListItem(props: TimerTaskListItemProps) {
  return (
    <StandardTaskListItem {...props} icon={<IconBellFilled />}>
      <TaskListItemEditPlaceholder>
        <TaskListItemTriggerButton
          uuid={props.uuid}
          task={props.task}
          menu={
            <Menu>
              <MenuItem variant="default" value="reminder">
                Reminder
              </MenuItem>
            </Menu>
          }
        />
      </TaskListItemEditPlaceholder>

      <TaskListItemReadOnlyPlaceholder>
        <TaskListItemPlayPauseButton uuid={props.uuid} task={props.task} />
      </TaskListItemReadOnlyPlaceholder>
    </StandardTaskListItem>
  );
}
