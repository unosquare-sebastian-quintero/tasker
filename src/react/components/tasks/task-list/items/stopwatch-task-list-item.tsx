import { IconClockFilled } from "@tabler/icons-react";
import { TaskListItemPlayPauseButton } from "./buttons/task-list-item-play-pause-button";
import {
  StandardTaskListItem,
  type StandardTaskListItemProps,
} from "./standard-task-list-item";

export type StopwatchTaskListItemProps = StandardTaskListItemProps;

export function StopwatchTaskListItem({
  ...props
}: StopwatchTaskListItemProps) {
  return (
    <StandardTaskListItem
      {...props}
      icon={<IconClockFilled />}
      readOnlyActions={
        <TaskListItemPlayPauseButton uuid={props.uuid} task={props.task} />
      }
    />
  );
}
