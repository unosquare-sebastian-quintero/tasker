import { contextBridge } from "electron";
import { createTaskerAPI, TaskerAPI } from "./api";

declare global {
  interface Window {
    tasker: TaskerAPI;
  }
}

contextBridge.exposeInMainWorld("tasker", createTaskerAPI());
