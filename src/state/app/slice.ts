import { StateCreator } from "zustand";
import { TaskerState } from "../types";
import { AppSlice } from "./types";

export const createAppSlice: StateCreator<
  TaskerState,
  [],
  [],
  AppSlice
> = () => ({
  window: {
    isPinned: false,
  },
});
