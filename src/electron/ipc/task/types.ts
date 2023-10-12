import { type TaskItem } from "../../../models/tasks";

type TaskId = {
  uuid: string;
};

export type TaskQuery = Partial<TaskId>;

export type TaskMutation =
  | { command: "create"; payload: TaskId & TaskItem }
  | { command: "update"; payload: TaskId & Partial<TaskItem> }
  | { command: "delete"; payload: TaskId }
  | { command: "switch"; payload: { uuid1: string; uuid2: string } };

export type TaskCommand =
  | { action: "start"; payload: TaskId }
  | { action: "stop"; payload: TaskId };
