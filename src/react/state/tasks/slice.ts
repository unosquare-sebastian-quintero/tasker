import { Task, TaskAction } from "../../../models/task";

export interface TaskSlice {
  tasks: Record<string, Task>;
  addTask: (task: Task) => void;
  removeTask: (uuid: string) => void;
  pushTaskAction: (uuid: string, action: TaskAction) => void;
}
