import {
  StandardTaskListItem,
  StandardTaskListItemProps,
} from "./standard-task-list-item";

export type StopwatchTaskListItemProps = StandardTaskListItemProps;

export function StopwatchTaskListItem({
  ...props
}: StopwatchTaskListItemProps) {
  return <StandardTaskListItem {...props} />;
}
