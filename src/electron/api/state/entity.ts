import { ipcRenderer } from "electron";
import { TaskerState } from "../../../state/types";
import { CHANNEL_SYNC_STATE } from "../../channels";

export interface StateEntity {
  subscribe(onUpdate: (state: TaskerState) => void): void;
}

export function createStateEntity() {
  return {
    subscribe(onUpdate) {
      // FIXME: looks like a memory leak

      ipcRenderer.send(CHANNEL_SYNC_STATE);

      ipcRenderer.on(
        CHANNEL_SYNC_STATE,
        function stateSync(_event, state: TaskerState) {
          onUpdate(state);
        },
      );
    },
  } satisfies StateEntity;
}
