import { IconBellFilled } from "@tabler/icons-react";
import { Menu } from "../../../common/menu/menu";
import { TaskListItemPlayPauseButton } from "./buttons/task-list-item-play-pause-button";
import { TaskListItemTriggerButton } from "./buttons/task-list-item-trigger-button";
import { TaskListItemEditPlaceholder } from "./content/task-list-item-edit-placeholder";
import { TaskListItemReadOnlyPlaceholder } from "./content/task-list-item-read-only-placeholder";
import { TaskListItemReminderMenuItem } from "./menu-items/task-list-item-reminder-menu-item";
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
              <TaskListItemReminderMenuItem uuid={props.uuid} />
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
