import { ipcRenderer } from "electron";
import { Task, TaskList } from "../../../models/tasks";
import { CHANNEL_MUTATE_TASK, CHANNEL_QUERY_TASK } from "../../channels";

export interface TaskEntity {
  createOne(task: Task): Promise<Task>;

  readMany(): Promise<TaskList>;

  updateOne(uuid: string, task: Partial<Task>): Promise<Task>;

  deleteOne(uuid: string): Promise<Task>;
}

export function createTaskEntity() {
  return {
    createOne(task) {
      return ipcRenderer.invoke(CHANNEL_MUTATE_TASK, {
        create: task,
      });
    },

    readMany() {
      return ipcRenderer.invoke(CHANNEL_QUERY_TASK, {});
    },

    updateOne(uuid, task) {
      return ipcRenderer.invoke(CHANNEL_MUTATE_TASK, {
        update: { uuid, ...task },
      });
    },

    deleteOne(uuid) {
      return ipcRenderer.invoke(CHANNEL_MUTATE_TASK, {
        delete: { uuid },
      });
    },
  } satisfies TaskEntity;
}
