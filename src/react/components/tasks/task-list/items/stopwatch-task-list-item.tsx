import { IconClockFilled } from "@tabler/icons-react";
import {
  StandardTaskListItem,
  type StandardTaskListItemProps,
} from "./standard-task-list-item";

export type StopwatchTaskListItemProps = StandardTaskListItemProps;

export function StopwatchTaskListItem({
  ...props
}: StopwatchTaskListItemProps) {
  return <StandardTaskListItem {...props} icon={<IconClockFilled />} />;
}
