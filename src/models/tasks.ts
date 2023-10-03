export type TaskType = "stopwatch";

export type TaskAction = {
  type: string;
  payload: unknown;
};

export type TaskItem = {
  type: TaskType;
  label: string;
  state: "idle" | "running" | "paused" | "stopped" | "finished";
  actions: TaskAction[];
};

export type TaskList = Record<string, TaskItem>;
