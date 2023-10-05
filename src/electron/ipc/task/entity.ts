import { ipcRenderer } from "electron";
import { type TaskItem, type TaskList } from "../../../models/tasks";
import {
  CHANNEL_MUTATE_TASK,
  CHANNEL_QUERY_TASK,
  CHANNEL_TRIGGER_TASK_COMMAND,
} from "./channels";
import { type TaskCommand, type TaskMutation } from "./types";

export interface TaskEntity {
  createOne(uuid: string, task: TaskItem): Promise<TaskItem>;

  readMany(): Promise<TaskList>;

  updateOne(uuid: string, task: Partial<TaskItem>): Promise<TaskItem>;

  deleteOne(uuid: string): Promise<TaskItem>;

  start(uuid: string): void;

  stop(uuid: string): void;
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

    start(uuid) {
      ipcRenderer.send(CHANNEL_TRIGGER_TASK_COMMAND, {
        action: "start",
        payload: { uuid },
      } satisfies TaskCommand);
    },

    stop(uuid) {
      ipcRenderer.send(CHANNEL_TRIGGER_TASK_COMMAND, {
        action: "stop",
        payload: { uuid },
      } satisfies TaskCommand);
    },
  } satisfies TaskEntity;
}
