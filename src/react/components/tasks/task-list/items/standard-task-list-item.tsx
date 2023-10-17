import {
  IconLock,
  IconLockOpen,
  type Icon,
  type TablerIconsProps,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useRef, useState } from "react";
import {
  type TaskItem,
  type TaskItemInitial,
} from "../../../../../models/tasks";
import { taskerAction, useTaskerStore } from "../../../../state";
import { ToggleButton } from "../../../common/toggle-button/toggle-button";
import { TaskListItemDeleteButton } from "./buttons/task-list-item-delete-button";
import { TaskListItemTextarea } from "./content/task-list-item-textarea";
import { TaskListItemTime } from "./content/task-list-item-time";
import styles from "./standard-task-list-item.module.scss";

export type StandardTaskListItemProps = React.PropsWithChildren & {
  uuid: string;
  task: TaskItem & TaskItemInitial;
  icon?: React.ReactElement<TablerIconsProps, Icon>;
  editInputs?: React.ReactNode;
  readOnlyActions?: React.ReactNode;
  editActions?: React.ReactNode;
};

export function StandardTaskListItem({
  uuid,
  task,
  icon,
  editInputs,
  readOnlyActions,
  editActions,
}: StandardTaskListItemProps) {
  const state = useTaskerStore((state) => state.task.items[uuid].state);

  const [isLockedByUser, setIsLockedByUser] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const dragCounterRef = useRef(0);

  const hasFinished = state === "finished";
  const isLocked = isLockedByUser || hasFinished;

  function handleLockToggleButton(pressed: boolean) {
    setIsLockedByUser(pressed);
  }

  function handleItemDragStart(event: React.DragEvent<HTMLLIElement>) {
    event.dataTransfer.setData("text/plain", uuid);
    event.dataTransfer.effectAllowed = "move";
    dragCounterRef.current = 0;
  }

  function handleItemDragOver(event: React.DragEvent<HTMLLIElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleItemDragEnter(event: React.DragEvent<HTMLLIElement>) {
    event.preventDefault();
    dragCounterRef.current++;
    setIsDraggedOver(true);
  }

  function handleItemDragLeave(event: React.DragEvent<HTMLLIElement>) {
    event.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current <= 0) {
      setIsDraggedOver(false);
    }
  }

  function handleItemDrop(event: React.DragEvent<HTMLLIElement>) {
    event.preventDefault();
    const otherUUID = event.dataTransfer.getData("text/plain");
    taskerAction.task.switchTask(uuid, otherUUID);
    dragCounterRef.current = 0;
    setIsDraggedOver(false);
  }

  return (
    <li
      className={clsx(styles["task-list-item"], {
        [styles["task-list-item--drag-over"]]: isDraggedOver,
      })}
      draggable
      onDragStart={handleItemDragStart}
      onDragOver={handleItemDragOver}
      onDragEnter={handleItemDragEnter}
      onDragLeave={handleItemDragLeave}
      onDrop={handleItemDrop}
    >
      <div
        className={clsx(
          styles["task-list-item__container"],
          styles["task-list-item__icon"],
        )}
      >
        {icon}
      </div>

      <TaskListItemTextarea uuid={uuid} isLocked={isLocked} />
      <div className={styles["task-list-item__container"]}>
        {!isLocked ? editInputs : null}
      </div>

      <div className={styles["task-list-item__container"]}>
        {isLocked ? (
          <>
            {readOnlyActions}
            {hasFinished ? (
              <TaskListItemDeleteButton uuid={uuid} task={task} />
            ) : null}
          </>
        ) : (
          <>
            {editActions}
            <TaskListItemDeleteButton uuid={uuid} task={task} />
          </>
        )}
        <TaskListItemTime task={task} />
      </div>

      <div className={styles["task-list-item__container"]}>
        <ToggleButton
          aria-label={`${isLocked ? "Unlock" : "Lock"} "${task.label}"`}
          aria-disabled={hasFinished}
          disabled={hasFinished}
          pressed={hasFinished ? true : undefined}
          onToggle={handleLockToggleButton}
        >
          {isLocked ? <IconLock /> : <IconLockOpen />}
        </ToggleButton>
      </div>
    </li>
  );
}
