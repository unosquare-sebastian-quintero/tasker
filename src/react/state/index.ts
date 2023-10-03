import { useStore } from "zustand";
import { taskerStore } from "../../state";
import { TaskerState } from "../../state/types";
import * as app from "./app/actions";
import * as task from "./task/actions";

export function useTaskerStore<T>(selector: (state: TaskerState) => T): T {
  return useStore(taskerStore, selector);
}

export const taskerAction = {
  app,
  task,
};
