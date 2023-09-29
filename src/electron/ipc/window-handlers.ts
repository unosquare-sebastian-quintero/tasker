import { ipcMain } from "electron";
import { EVENT_TOGGLE_PIN_WINDOW } from "../events";
import { state } from "../state";

export function registerWindowHandlers() {
  ipcMain.on(EVENT_TOGGLE_PIN_WINDOW, () => {
    state.app.toggleWindowPinned();
  });
}
