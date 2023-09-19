import { contextBridge, ipcRenderer } from "electron";
import { EVENT_TOGGLE_PIN_WINDOW } from "./commands";

contextBridge.exposeInMainWorld("electron", {
  togglePinWindow() {
    ipcRenderer.send(EVENT_TOGGLE_PIN_WINDOW);
  },
});
