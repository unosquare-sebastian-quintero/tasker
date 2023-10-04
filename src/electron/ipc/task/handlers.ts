import { ipcMain } from "electron";
import { produce } from "immer";
import { type TaskItem } from "../../../models/tasks";
import { taskerStore } from "../../../state";
import { CHANNEL_MUTATE_TASK, CHANNEL_QUERY_TASK } from "./channels";

export type TaskQuery = {
  uuid?: string;
};

export type TaskMutation =
  | { command: "create"; payload: { uuid: string } & TaskItem }
  | { command: "update"; payload: { uuid: string } & Partial<TaskItem> }
  | { command: "delete"; payload: { uuid: string } };

export function registerTaskHandlers() {
  ipcMain.handle(
    CHANNEL_QUERY_TASK,
    function taskQueryListener(_event, query: TaskQuery) {
      console.log(query);
    },
  );

  ipcMain.handle(
    CHANNEL_MUTATE_TASK,
    function taskMutationListener(_event: unknown, mutation: TaskMutation) {
      switch (mutation.command) {
        case "create":
          taskerStore.setState((state) =>
            produce(state, (draft) => {
              const { uuid, ...task } = mutation.payload;
              draft.task.items[uuid] = task;
            }),
          );
          return taskerStore.getState().task.items[mutation.payload.uuid];

        case "update":
          taskerStore.setState((state) =>
            produce(state, (draft) => {
              const { uuid, ...task } = mutation.payload;
              draft.task.items[uuid] = { ...draft.task.items[uuid], ...task };
            }),
          );
          return taskerStore.getState().task.items[mutation.payload.uuid];

        case "delete":
          taskerStore.setState((state) =>
            produce(state, (draft) => {
              const { uuid } = mutation.payload;
              delete draft.task.items[uuid];
            }),
          );
          return mutation.payload.uuid;

        default:
          break;
      }
    },
  );
}
