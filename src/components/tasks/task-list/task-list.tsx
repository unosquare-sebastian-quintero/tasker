import { useStore } from "../../../state";
import { TaskListItem } from "./items/task-list-item";
import styles from "./task-list.module.scss";

export function TaskList() {
  const tasks = useStore((state) => state.tasks);

  return (
    <ul className={styles["task-list"]}>
      {Object.entries(tasks).map(([uuid, task]) => (
        <TaskListItem key={uuid} uuid={uuid} task={task} />
      ))}
    </ul>
  );
}
