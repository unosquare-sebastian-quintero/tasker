import { type TaskItem } from "../../../../../../models/tasks";
import styles from "./styles.module.scss";
import { TaskListItemPlayPauseButton } from "./task-list-item-play-pause-button";
import { TaskListItemStopButton } from "./task-list-item-stop-button";

export type TaskListItemReadOnlyActionsProps = {
  uuid: string;
  task: TaskItem;
};

export function TaskListItemReadOnlyActions({
  uuid,
  task,
}: TaskListItemReadOnlyActionsProps) {
  console.log(uuid, task);

  return (
    <div className={styles.actions}>
      <TaskListItemPlayPauseButton uuid={uuid} task={task} />
      <TaskListItemStopButton uuid={uuid} task={task} />
    </div>
  );
}
