import { ipcMain } from "electron";
import { type TaskItem } from "../../../models/tasks";
import { CHANNEL_MUTATE_TASK, CHANNEL_QUERY_TASK } from "../../channels";

export type TaskQuery = {
  uuid?: string;
};

export type TaskMutation = {
  create?: TaskItem;
  update?: { uuid: string } & Partial<TaskItem>;
  delete?: { uuid: string };
};

export function registerTaskHandlers() {
  ipcMain.handle(
    CHANNEL_QUERY_TASK,
    function taskQueryListener(_event, query: TaskQuery) {
      console.log(query);
    },
  );

  ipcMain.handle(
    CHANNEL_MUTATE_TASK,
    function taskMutationListener(_event, mutation: TaskMutation) {
      console.log(mutation);
    },
  );
}
