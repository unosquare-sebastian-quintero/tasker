import { create } from "zustand";
import { State } from "./state";
import { createTaskSlice } from "./tasks/creator";

export const useStore = create<State>((...args) => ({
  ...createTaskSlice(...args),
}));
