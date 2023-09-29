import { create } from "zustand";
import { createAppSlice } from "./app/creator";
import { State } from "./state";
import { createTaskSlice } from "./tasks/creator";

export const useStore = create<State>((...args) => ({
  ...createAppSlice(...args),
  ...createTaskSlice(...args),
}));

if (window.tasker != null) {
  window.tasker.onLoad(function onLoaded(state) {
    console.log("Sync", state);
    useStore.setState({
      isPinned: state.app.isPinned,
    });
  });
}
