import { createAppEntity, type AppEntity } from "./app/entity";
import { createStateEntity, type StateEntity } from "./state/entity";
import { createTaskEntity, type TaskEntity } from "./task/entity";

export interface TaskerAPI {
  app: AppEntity;
  state: StateEntity;
  task: TaskEntity;
}

export function createTaskerAPI() {
  return {
    app: createAppEntity(),

    state: createStateEntity(),

    task: createTaskEntity(),
  } satisfies TaskerAPI;
}
