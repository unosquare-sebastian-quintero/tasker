import { contextBridge, ipcRenderer } from "electron";
import {
  EVENT_CHANGE_ICON,
  EVENT_TOGGLE_PIN_WINDOW,
  EVENT_WINDOW_LOAD,
} from "./events";
import { SharedState } from "./state";

export interface TaskerAPI {
  onLoad(callback: (state: SharedState) => void): void;
  togglePinWindow(): void;
  changeIcon(): void;
}

declare global {
  interface Window {
    tasker: TaskerAPI;
  }
}

contextBridge.exposeInMainWorld("tasker", {
  onLoad(callback) {
    console.log("onLoad");
    ipcRenderer.on(EVENT_WINDOW_LOAD, (_event, sharedState) =>
      callback(sharedState),
    );
  },
  togglePinWindow() {
    ipcRenderer.send(EVENT_TOGGLE_PIN_WINDOW);
  },
  changeIcon() {
    ipcRenderer.send(EVENT_CHANGE_ICON);
  },
} satisfies TaskerAPI);
