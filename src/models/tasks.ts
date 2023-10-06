export type TaskType = "stopwatch" | "timer";

export type TaskAction = {
  type: "notification";
  payload: { message?: string };
};
// | { type: string; payload: unknown };

export type TaskItem = {
  type: TaskType;
  label: string;
  time: number;
  state: "idle" | "running" | "paused" | "stopped" | "finished";
  actions: TaskAction[];
};

export type TaskList = Record<string, TaskItem>;
