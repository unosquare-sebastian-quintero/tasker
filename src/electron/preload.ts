import { contextBridge } from "electron";
import { createTaskerAPI, type TaskerAPI } from "./ipc/renderer";

declare global {
  interface Window {
    tasker: TaskerAPI;
  }
}

contextBridge.exposeInMainWorld("tasker", createTaskerAPI());
