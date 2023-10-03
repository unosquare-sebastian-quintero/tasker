import { contextBridge, ipcRenderer } from "electron";
import { Task, TaskList } from "../models/tasks";
import {
  CHANNEL_MUTATE_TASK,
  CHANNEL_QUERY_TASK,
  CHANNEL_TOGGLE_PIN_WINDOW,
} from "./channels";
import { EVENT_CHANGE_ICON } from "./events";

interface TaskCollection {
  createOne(task: Task): Promise<Task>;

  readMany(): Promise<TaskList>;

  updateOne(uuid: string, task: Partial<Task>): Promise<Task>;

  deleteOne(uuid: string): Promise<Task>;
}

interface TaskerAPI {
  togglePinWindow(): void;
  changeIcon(): void;

  task: TaskCollection;
}

declare global {
  interface Window {
    tasker: TaskerAPI;
  }
}

contextBridge.exposeInMainWorld("tasker", {
  togglePinWindow() {
    ipcRenderer.send(CHANNEL_TOGGLE_PIN_WINDOW);
  },
  changeIcon() {
    ipcRenderer.send(EVENT_CHANGE_ICON);
  },

  task: {
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
  },
} satisfies TaskerAPI);
