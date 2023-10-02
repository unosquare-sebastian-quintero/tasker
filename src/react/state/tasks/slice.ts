import { Task, TaskAction, TaskList } from "../../../models/tasks";

export interface TaskSlice {
  tasks: TaskList;
  addTask: (task: Task) => void;
  updateTask: (uuid: string, task: Partial<Task>) => void;
  removeTask: (uuid: string) => void;
  pushTaskAction: (uuid: string, action: TaskAction) => void;
}
