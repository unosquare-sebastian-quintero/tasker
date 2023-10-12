import { useTaskerStore } from "../../../state";
import { TaskListItem } from "./items/task-list-item";
import styles from "./task-list.module.scss";

export function TaskList() {
  const tasks = useTaskerStore((state) => state.task.items);
  const orderedTask = Object.entries(tasks).sort(([, taskA], [, taskB]) => {
    return taskA.order - taskB.order;
  });

  return (
    <ul className={styles["task-list"]}>
      {orderedTask.map(([uuid, task]) => (
        <TaskListItem key={uuid} uuid={uuid} task={task} />
      ))}
    </ul>
  );
}
