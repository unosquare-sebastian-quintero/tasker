import { createStore } from "zustand/vanilla";
import { createAppSlice } from "./app/slice";
import { createTaskSlice } from "./task/slice";
import { TaskerState } from "./types";

export const taskerStore = createStore<TaskerState>((...args) => ({
  app: createAppSlice(...args),
  task: createTaskSlice(...args),
}));
