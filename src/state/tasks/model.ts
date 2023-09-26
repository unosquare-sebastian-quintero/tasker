export type TaskAction = {
  type: string;
  payload: unknown;
};

export type Task = {
  label: string;
  state: "idle" | "running" | "paused" | "stopped" | "finished";
  actions: TaskAction[];
};
