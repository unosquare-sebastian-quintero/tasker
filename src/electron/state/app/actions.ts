import { produce } from "immer";
import { taskerStore } from "../../../state";

export function openWindow() {
  taskerStore.setState((state) =>
    produce(state, (draft) => {
      draft.app.window.isOpen = true;
    }),
  );
}

export function closeWindow() {
  taskerStore.setState((state) =>
    produce(state, (draft) => {
      draft.app.window.isOpen = false;
    }),
  );
}

export function pinWindow() {}

export function unpinWindow() {}
