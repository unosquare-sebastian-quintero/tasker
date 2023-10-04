import { type StateCreator } from "zustand";
import { type TaskerState } from "../types";
import { type TaskSlice } from "./types";

export const createTaskSlice: StateCreator<
  TaskerState,
  [],
  [],
  TaskSlice
> = () => ({
  items: {},
});
