import { ipcMain } from "electron";
import { produce } from "immer";
import { taskerStore } from "../../../state";
import {
  CHANNEL_CLOSE_WINDOW,
  CHANNEL_TOGGLE_PIN_WINDOW,
} from "../../channels";

export function registerAppHandlers() {
  ipcMain.on(CHANNEL_TOGGLE_PIN_WINDOW, function windowPinToggle() {
    taskerStore.setState((state) =>
      produce(state, (draft) => {
        draft.app.window.isPinned = !draft.app.window.isPinned;
      }),
    );
  });

  ipcMain.on(CHANNEL_CLOSE_WINDOW, function windowClose() {
    // TODO: state close window
  });
}
