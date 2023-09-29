import { Task } from "../../models/task";

type TaskState = {
  items: Task[];
};

export const task: TaskState = {
  items: [],
};
