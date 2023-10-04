import { type TaskType } from "../../../../../models/tasks";
import {
  StandardTaskListItem,
  type StandardTaskListItemProps,
} from "./standard-task-list-item";
import {
  StopwatchTaskListItem,
  type StopwatchTaskListItemProps,
} from "./stopwatch-task-list-item";
import {
  TimerTaskListItem,
  type TimerTaskListItemProps,
} from "./timer-task-list-item";

const COMPONENT_TYPE_MAP: Record<
  TaskType,
  | React.ComponentType<StandardTaskListItemProps>
  | React.ComponentType<StopwatchTaskListItemProps>
  | React.ComponentType<TimerTaskListItemProps>
> = {
  stopwatch: StopwatchTaskListItem,
  timer: TimerTaskListItem,
};

export type TaskListItemProps =
  | StandardTaskListItemProps
  | StopwatchTaskListItemProps
  | TimerTaskListItemProps;

export function TaskListItem(props: TaskListItemProps) {
  const Component = COMPONENT_TYPE_MAP[props.task.type] ?? StandardTaskListItem;

  return <Component {...props} />;
}
