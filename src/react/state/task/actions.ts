import { produce } from "immer";
import { v4 } from "uuid";
import { Task, TaskAction } from "../../../models/tasks";
import { taskerStore } from "../../../state";

export function addTask(task: Task) {
  console.log("[state] addTask", task);
  const uuid = v4();
  taskerStore.setState((state) =>
    produce(state, (draft) => {
      draft.task.items[uuid] = task;
    }),
  );
  return uuid;
}

export function updateTask(uuid: string, task: Partial<Task>) {
  console.log("[state] updateTask", uuid, task);
  if (taskerStore.getState().task.items[uuid] == null) {
    return;
  }

  taskerStore.setState((state) =>
    produce(state, (draft) => {
      draft.task.items[uuid] = { ...draft.task.items[uuid], ...task };
    }),
  );
}

export function removeTask(uuid: string) {
  console.log("[state] removeTask", uuid);
  taskerStore.setState((state) =>
    produce(state, (draft) => {
      delete draft.task.items[uuid];
    }),
  );
}

export function pushTaskAction(uuid: string, action: TaskAction) {
  taskerStore.setState((state) =>
    produce(state, (draft) => {
      draft.task.items[uuid].actions.push(action);
    }),
  );
}
