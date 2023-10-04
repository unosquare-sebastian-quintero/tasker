import { type StateCreator } from "zustand";
import { type TaskerState } from "../types";
import { type AppSlice } from "./types";

export const createAppSlice: StateCreator<
  TaskerState,
  [],
  [],
  AppSlice
> = () => ({
  window: {
    isOpen: false,
    isPinned: false,
  },
});
