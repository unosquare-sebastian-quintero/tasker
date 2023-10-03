import { CreateStopwatchTaskButton } from "./buttons/create-stopwatch-task-button";
import { TaskList } from "./task-list/task-list";
import styles from "./tasks.module.scss";

export function Tasks() {
  return (
    <div className={styles.tasks}>
      <TaskList />
      <div className={styles.tasks__actions}>
        <CreateStopwatchTaskButton />
      </div>
    </div>
  );
}