import { type TaskItem } from "../../../../../../models/tasks";
import { type Menu, type MenuProps } from "../../../../common/menu/menu";
import styles from "./styles.module.scss";
import { TaskListItemDeleteButton } from "./task-list-item-delete-button";
import { TaskListItemTriggerButton } from "./task-list-item-trigger-button";

export type TaskListItemEditActionsProps = {
  uuid: string;
  task: TaskItem;
  menu?: React.ReactElement<MenuProps, typeof Menu>;
};

export function TaskListItemEditActions({
  uuid,
  task,
  menu,
}: TaskListItemEditActionsProps) {
  return (
    <div className={styles.actions}>
      {menu ? (
        <TaskListItemTriggerButton uuid={uuid} task={task} menu={menu} />
      ) : null}
      <TaskListItemDeleteButton uuid={uuid} task={task} />
    </div>
  );
}
