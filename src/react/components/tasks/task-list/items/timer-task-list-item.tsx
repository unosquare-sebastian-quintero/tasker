import { IconBellFilled } from "@tabler/icons-react";
import {
  StandardTaskListItem,
  type StandardTaskListItemProps,
} from "./standard-task-list-item";

export type TimerTaskListItemProps = StandardTaskListItemProps;

export function TimerTaskListItem({ ...props }: TimerTaskListItemProps) {
  return <StandardTaskListItem {...props} icon={<IconBellFilled />} />;
}
