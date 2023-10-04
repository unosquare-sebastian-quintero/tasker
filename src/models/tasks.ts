export type TaskType = "stopwatch" | "timer";

export type TaskAction = {
  type: string;
  payload: unknown;
};

export type TaskItem = {
  type: TaskType;
  label: string;
  time: number;
  initialTime: number;
  state: "idle" | "running" | "paused" | "stopped" | "finished";
  actions: TaskAction[];
};

export type TaskList = Record<string, TaskItem>;
