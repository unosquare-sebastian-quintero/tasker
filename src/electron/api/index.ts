import { ipcRenderer } from "electron";
import { EVENT_CHANGE_ICON } from "../events";
import { AppEntity, createAppEntity } from "./app/entity";
import { createStateEntity, StateEntity } from "./state/entity";
import { createTaskEntity, TaskEntity } from "./task/entity";

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
