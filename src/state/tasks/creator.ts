import { produce } from "immer";
import { v4 } from "uuid";
import { StateCreator } from "zustand";
import { State } from "../state";
import { TaskSlice } from "./slice";

export const createTaskSlice: StateCreator<State, [], [], TaskSlice> = (
  set,
) => ({
  tasks: {},
  addTask(task) {
    const uuid = v4();
    set((state) =>
      produce(state, (draft) => {
        draft.tasks[uuid] = task;
      }),
    );
    return uuid;
  },
  pushTaskAction(uuid, action) {
    set((state) =>
      produce(state, (draft) => {
        draft.tasks[uuid].actions.push(action);
      }),
    );
  },
});
