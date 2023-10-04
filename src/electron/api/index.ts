import { ipcRenderer } from "electron";
import { EVENT_CHANGE_ICON } from "../events";
import { createAppEntity, type AppEntity } from "./app/entity";
import { createStateEntity, type StateEntity } from "./state/entity";
import { createTaskEntity, type TaskEntity } from "./task/entity";

export interface TaskerAPI {
  changeIcon(): void;

  app: AppEntity;
  state: StateEntity;
  task: TaskEntity;
}

export function createTaskerAPI() {
  return {
    changeIcon() {
      ipcRenderer.send(EVENT_CHANGE_ICON);
    },

    app: createAppEntity(),

    state: createStateEntity(),

    task: createTaskEntity(),
  } satisfies TaskerAPI;
}
