import { produce } from "immer";
import { v4 } from "uuid";
import { type TaskAction, type TaskItem } from "../../../models/tasks";
import { taskerStore } from "../../../state";

export async function addTask(task: TaskItem) {
  console.log("[state] addTask", task);
  const uuid = v4();
  return window.tasker.task.createOne(uuid, task);
}

export async function updateTask(uuid: string, task: Partial<TaskItem>) {
  console.log("[state] updateTask", uuid, task);
  if (taskerStore.getState().task.items[uuid] == null) {
    return;
  }

  return window.tasker.task.updateOne(uuid, task);
}

export async function removeTask(uuid: string) {
  console.log("[state] removeTask", uuid);
  return window.tasker.task.deleteOne(uuid);
}

export async function startTask(uuid: string) {
  return window.tasker.task.start(uuid);
}

export async function stopTask(uuid: string) {
  return window.tasker.task.stop(uuid);
}

export async function pushTaskAction(uuid: string, action: TaskAction) {
  taskerStore.setState((state) =>
    produce(state, (draft) => {
      draft.task.items[uuid].actions.push(action);
    }),
  );
}
