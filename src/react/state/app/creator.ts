import { StateCreator } from "zustand";
import { State } from "../state";
import { AppSlice } from "./slice";

export const createAppSlice: StateCreator<State, [], [], AppSlice> = () => ({
  isPinned: false,
});
