import { ipcRenderer } from "electron";
import {
  CHANNEL_CHANGE_TRAY_ICON,
  CHANNEL_CLOSE_WINDOW,
  CHANNEL_TOGGLE_PIN_WINDOW,
} from "./channels";

export interface AppEntity {
  togglePinWindow(): void;

  closeWindow(): void;

  changeTrayIcon(): void;
}

export function createAppEntity() {
  return {
    togglePinWindow() {
      ipcRenderer.send(CHANNEL_TOGGLE_PIN_WINDOW);
    },

    closeWindow() {
      ipcRenderer.send(CHANNEL_CLOSE_WINDOW);
    },

    changeTrayIcon() {
      ipcRenderer.send(CHANNEL_CHANGE_TRAY_ICON);
    },
  } satisfies AppEntity;
}
