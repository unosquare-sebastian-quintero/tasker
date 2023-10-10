import { IconBellFilled } from "@tabler/icons-react";
import { Menu } from "../../../common/menu/menu";
import { TaskListItemPlayPauseButton } from "./buttons/task-list-item-play-pause-button";
import { TaskListItemTriggerButton } from "./buttons/task-list-item-trigger-button";
import { TaskListItemSelect } from "./content/task-list-item-select";
import { TaskListItemCommandMenuItem } from "./menu-items/task-list-item-command-menu-item";
import { TaskListItemMailMenuItem } from "./menu-items/task-list-item-mail-menu-item";
import { TaskListItemReminderMenuItem } from "./menu-items/task-list-item-reminder-menu-item";
import {
  StandardTaskListItem,
  type StandardTaskListItemProps,
} from "./standard-task-list-item";

export type TimerTaskListItemProps = StandardTaskListItemProps;

export function TimerTaskListItem(props: TimerTaskListItemProps) {
  return (
    <StandardTaskListItem
      {...props}
      icon={<IconBellFilled />}
      editInputs={<TaskListItemSelect uuid={props.uuid} />}
      editActions={
        <TaskListItemTriggerButton
          uuid={props.uuid}
          task={props.task}
          menu={
            <Menu>
              <TaskListItemReminderMenuItem uuid={props.uuid} />
              <TaskListItemCommandMenuItem uuid={props.uuid} />
              <TaskListItemMailMenuItem uuid={props.uuid} />
            </Menu>
          }
        />
      }
      readOnlyActions={
        <TaskListItemPlayPauseButton uuid={props.uuid} task={props.task} />
      }
    />
  );
}
