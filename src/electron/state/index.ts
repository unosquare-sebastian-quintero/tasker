import { app } from "./app";
import { task } from "./task";

export const state = {
  app,
  task,
};

export type State = typeof state;

export type SharedState = {
  app: {
    isPinned: boolean;
  };
};

export function toShared(state: State) {
  return {
    app: {
      isPinned: state.app.windowPinned,
    },
  } satisfies SharedState;
}
