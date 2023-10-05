import { produce } from "immer";
import { taskerStore } from "../../../state";

export function tick(uuid: string, seconds: number) {
  const task = taskerStore.getState().task.items[uuid];
  if (task == null) {
    return;
  }

  taskerStore.setState((state) =>
    produce(state, (draft) => {
      switch (task.type) {
        case "stopwatch":
          draft.task.items[uuid].time += seconds;

          break;

        case "timer":
          if (task.time > 0) {
            draft.task.items[uuid].time -= seconds;
          }

          if (task.time <= 0) {
            draft.task.items[uuid].state = "finished";
            draft.task.items[uuid].time = 0;
          }
          break;

        default:
          console.error(`Unknown task ${task}`);
          break;
      }
    }),
  );
}
