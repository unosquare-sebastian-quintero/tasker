import { TaskType } from "../../../../state/tasks/model";
import {
  StandardTaskListItem,
  StandardTaskListItemProps,
} from "./standard-task-list-item";
import {
  StopwatchTaskListItem,
  StopwatchTaskListItemProps,
} from "./stopwatch-task-list-item";

const COMPONENT_TYPE_MAP: Record<
  TaskType,
  | React.ComponentType<StandardTaskListItemProps>
  | React.ComponentType<StopwatchTaskListItemProps>
> = {
  stopwatch: StopwatchTaskListItem,
};

export type TaskListItemProps =
  | StandardTaskListItemProps
  | StopwatchTaskListItemProps;

export function TaskListItem(props: TaskListItemProps) {
  const Component = COMPONENT_TYPE_MAP[props.task.type] ?? StandardTaskListItem;

  return <Component {...props} />;
}
