import { type TaskType } from "../../../../../models/tasks";
import {
  AlarmTaskListItem,
  type AlarmTaskListItemProps,
} from "./alarm-task-list-item";
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
  | React.ComponentType<AlarmTaskListItemProps>
  | React.ComponentType<StandardTaskListItemProps>
  | React.ComponentType<StopwatchTaskListItemProps>
  | React.ComponentType<TimerTaskListItemProps>
> = {
  alarm: AlarmTaskListItem,
  stopwatch: StopwatchTaskListItem,
  timer: TimerTaskListItem,
};

export type TaskListItemProps =
  | AlarmTaskListItemProps
  | StandardTaskListItemProps
  | StopwatchTaskListItemProps
  | TimerTaskListItemProps;

export function TaskListItem(props: TaskListItemProps) {
  const Component = COMPONENT_TYPE_MAP[props.task.type] ?? StandardTaskListItem;

  return <Component {...props} />;
}
