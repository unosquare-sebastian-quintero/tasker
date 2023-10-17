export type TaskType = "stopwatch" | "timer" | "alarm";

export type TaskAction =
  | { type: "notification"; payload: { message?: string } }
  | { type: "command"; payload: { cmd: string; args?: string[] } }
  | {
      type: "mail";
      payload: {
        to?: string;
        cc?: string;
        bcc?: string;
        subject?: string;
        body?: string;
      };
    };

export type TaskItemOrder = {
  order: number;
};

export type TaskItemInitial = {
  initialTime: number;
};

export type TaskItem = {
  type: TaskType;
  label: string;
  time: number;
  state: "idle" | "running" | "paused" | "stopped" | "finished";
  actions: TaskAction[];
};

export type TaskList = Record<
  string,
  TaskItemOrder & TaskItemInitial & TaskItem
>;
