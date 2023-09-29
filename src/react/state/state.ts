import { AppSlice } from "./app/slice";
import { TaskSlice } from "./tasks/slice";

export type State = AppSlice & TaskSlice;
