import { StateCreator } from "zustand";
import { TaskerState } from "../types";
import { TaskSlice } from "./types";

export const createTaskSlice: StateCreator<
  TaskerState,
  [],
  [],
  TaskSlice
> = () => ({
  items: {},
});
