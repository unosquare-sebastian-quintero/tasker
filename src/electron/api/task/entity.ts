import { ipcRenderer } from "electron";
import { type TaskItem, type TaskList } from "../../../models/tasks";
import { CHANNEL_MUTATE_TASK, CHANNEL_QUERY_TASK } from "../../channels";
import { type TaskMutation } from "../../ipc/task/handlers";

export interface TaskEntity {
  createOne(uuid: string, task: TaskItem): Promise<TaskItem>;

  readMany(): Promise<TaskList>;

  updateOne(uuid: string, task: Partial<TaskItem>): Promise<TaskItem>;

  deleteOne(uuid: string): Promise<TaskItem>;
}

export function createTaskEntity() {
  return {
    createOne(uuid, task) {
      return ipcRenderer.invoke(CHANNEL_MUTATE_TASK, {
        command: "create",
        payload: { uuid, ...task },
      } satisfies TaskMutation);
    },

    readMany() {
      return ipcRenderer.invoke(CHANNEL_QUERY_TASK, {});
    },

    updateOne(uuid, task) {
      return ipcRenderer.invoke(CHANNEL_MUTATE_TASK, {
        command: "update",
        payload: { uuid, ...task },
      } satisfies TaskMutation);
    },

    deleteOne(uuid) {
      return ipcRenderer.invoke(CHANNEL_MUTATE_TASK, {
        command: "delete",
        payload: { uuid },
      } satisfies TaskMutation);
    },
  } satisfies TaskEntity;
}
