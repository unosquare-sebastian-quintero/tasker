import { Task, TaskAction } from "./model";

export interface TaskSlice {
  tasks: Record<string, Task>;
  addTask: (task: Task) => void;
  removeTask: (uuid: string) => void;
  pushTaskAction: (uuid: string, action: TaskAction) => void;
}
