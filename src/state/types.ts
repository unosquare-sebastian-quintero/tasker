import { type AppSlice } from "./app/types";
import { type TaskSlice } from "./task/types";

export type TaskerState = {
  app: AppSlice;
  task: TaskSlice;
};
