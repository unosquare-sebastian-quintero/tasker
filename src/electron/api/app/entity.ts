import { ipcRenderer } from "electron";
import { CHANNEL_TOGGLE_PIN_WINDOW } from "../../channels";

export interface AppEntity {
  togglePinWindow(): void;
}

export function createAppEntity() {
  return {
    togglePinWindow() {
      ipcRenderer.send(CHANNEL_TOGGLE_PIN_WINDOW);
    },
  } satisfies AppEntity;
}
