import { contextBridge, ipcRenderer } from "electron";
import { EVENT_CHANGE_ICON, EVENT_TOGGLE_PIN_WINDOW } from "./events";

export interface ElectronAPI {
  togglePinWindow(): void;
  changeIcon(): void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

contextBridge.exposeInMainWorld("electron", {
  togglePinWindow() {
    ipcRenderer.send(EVENT_TOGGLE_PIN_WINDOW);
  },
  changeIcon() {
    ipcRenderer.send(EVENT_CHANGE_ICON);
  },
});
