import { produce } from "immer";
import { v4 } from "uuid";
import { StateCreator } from "zustand";
import { State } from "../state";
import { TaskSlice } from "./slice";

export const createTaskSlice: StateCreator<State, [], [], TaskSlice> = (
  set,
  get,
) => ({
  tasks: {},
  addTask(task) {
    console.log("[state] addTask", task);
    const uuid = v4();
    set((state) =>
      produce(state, (draft) => {
        draft.tasks[uuid] = task;
      }),
    );
    return uuid;
  },
  updateTask(uuid, task) {
    console.log("[state] updateTask", uuid, task);
    if (get().tasks[uuid] == null) {
      return;
    }

    set((state) =>
      produce(state, (draft) => {
        draft.tasks[uuid] = { ...draft.tasks[uuid], ...task };
      }),
    );
  },
  removeTask(uuid) {
    console.log("[state] removeTask", uuid);
    set((state) =>
      produce(state, (draft) => {
        delete draft.tasks[uuid];
      }),
    );
  },
  pushTaskAction(uuid, action) {
    set((state) =>
      produce(state, (draft) => {
        draft.tasks[uuid].actions.push(action);
      }),
    );
  },
});
