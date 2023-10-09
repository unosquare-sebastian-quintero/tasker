import { exec } from "child_process";
import { ipcMain, Notification } from "electron";
import { produce } from "immer";
import { type TaskItem } from "../../../models/tasks";
import { taskerStore } from "../../../state";
import { taskerAction } from "../../state";
import {
  CHANNEL_MUTATE_TASK,
  CHANNEL_QUERY_TASK,
  CHANNEL_TRIGGER_TASK_COMMAND,
} from "./channels";
import { type TaskCommand, type TaskMutation, type TaskQuery } from "./types";

function triggerActions(task: TaskItem) {
  task.actions.forEach((action) => {
    switch (action.type) {
      case "notification":
        new Notification({
          title: `Tasker ${task.type}`,
          body: action.payload.message ?? task.label,
        }).show();
        break;

      case "command":
        exec(action.payload.cmd);
        break;

      default:
        console.error("Unkown task action ", action);
        break;
    }
  });
}

export function registerTaskHandlers() {
  const taskHandlers = new Map<string, ReturnType<typeof setInterval>>();

  function startTaskClock(uuid: string) {
    const handle = setInterval(function taskClock() {
      taskerAction.task.tick(uuid, 1);
    }, 1000);
    taskHandlers.set(uuid, handle);
  }

  function stopTaskClock(uuid: string) {
    clearInterval(taskHandlers.get(uuid));
    taskHandlers.delete(uuid);
  }

  taskerStore.subscribe(function onStateChange(state) {
    const taskIds = taskHandlers.keys();
    for (const uuid of taskIds) {
      const task = state.task.items[uuid];
      if (task.state === "finished") {
        triggerActions(task);
        stopTaskClock(uuid);
      }
    }
  });

  ipcMain.handle(
    CHANNEL_QUERY_TASK,
    function taskQueryListener(_event, query: TaskQuery) {
      console.log(query);
    },
  );

  ipcMain.handle(
    CHANNEL_MUTATE_TASK,
    function taskMutationListener(_event: unknown, mutation: TaskMutation) {
      switch (mutation.command) {
        case "create":
          taskerStore.setState((state) =>
            produce(state, (draft) => {
              const { uuid, ...task } = mutation.payload;
              draft.task.items[uuid] = task;
            }),
          );
          return taskerStore.getState().task.items[mutation.payload.uuid];

        case "update":
          taskerStore.setState((state) =>
            produce(state, (draft) => {
              const { uuid, ...task } = mutation.payload;
              draft.task.items[uuid] = { ...draft.task.items[uuid], ...task };
            }),
          );
          return taskerStore.getState().task.items[mutation.payload.uuid];

        case "delete":
          taskerStore.setState((state) =>
            produce(state, (draft) => {
              const { uuid } = mutation.payload;
              delete draft.task.items[uuid];
            }),
          );
          return mutation.payload.uuid;

        default:
          break;
      }
    },
  );

  ipcMain.on(
    CHANNEL_TRIGGER_TASK_COMMAND,
    function taskCommandListener(_event: unknown, command: TaskCommand) {
      switch (command.action) {
        case "start":
          startTaskClock(command.payload.uuid);
          taskerStore.setState((state) =>
            produce(state, (draft) => {
              draft.task.items[command.payload.uuid].state = "running";
            }),
          );
          break;

        case "stop":
          stopTaskClock(command.payload.uuid);
          taskerStore.setState((state) =>
            produce(state, (draft) => {
              draft.task.items[command.payload.uuid].state = "paused";
            }),
          );
          break;

        default:
          break;
      }
    },
  );
}
