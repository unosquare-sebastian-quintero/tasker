import { ipcRenderer } from "electron";
import { type TaskItem, type TaskList } from "../../../models/tasks";
import { CHANNEL_MUTATE_TASK, CHANNEL_QUERY_TASK } from "../../channels";

export interface TaskEntity {
  createOne(task: TaskItem): Promise<TaskItem>;

  readMany(): Promise<TaskList>;

  updateOne(uuid: string, task: Partial<TaskItem>): Promise<TaskItem>;

  deleteOne(uuid: string): Promise<TaskItem>;
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
