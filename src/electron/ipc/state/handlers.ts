import { ipcMain } from "electron";
import { taskerStore } from "../../../state";
import { CHANNEL_SYNC_STATE } from "./channels";

export function registerStateHandlers() {
  const frames = new Map<number, () => void>();

  ipcMain.on(CHANNEL_SYNC_STATE, function stateSync(event) {
    if (frames.has(event.frameId)) {
      const unsubscribe = frames.get(event.frameId);
      unsubscribe!();
    }

    event.sender.send(CHANNEL_SYNC_STATE, taskerStore.getState());
    const unsubscribe = taskerStore.subscribe((state) => {
      event.sender.send(CHANNEL_SYNC_STATE, state);
    });
    frames.set(event.frameId, unsubscribe);
  });
}
