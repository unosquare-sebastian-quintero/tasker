import { useStore } from "zustand";
import { taskerStore } from "../../state";
import { type TaskerState } from "../../state/types";
import * as app from "./app/actions";
import * as task from "./task/actions";

if (window.tasker) {
  window.tasker.state.subscribe(function onStateUpdate(state) {
    console.log("[state] syncing...");
    taskerStore.setState(state);
  });
}

export function useTaskerStore<T>(selector: (state: TaskerState) => T): T {
  return useStore(taskerStore, selector);
}

export const taskerAction = {
  app,
  task,
};
