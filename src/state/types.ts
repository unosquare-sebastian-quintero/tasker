import { AppSlice } from "./app/types";
import { TaskSlice } from "./task/types";

export type TaskerState = {
  app: AppSlice;
  task: TaskSlice;
};
