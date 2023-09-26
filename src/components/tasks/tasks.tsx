import { IconAlarm, IconTimeDuration0 } from "@tabler/icons-react";
import { Button } from "../common/button/button";
import { Typography } from "../common/typography/typography";
import { TaskList } from "./task-list";
import { TaskListItem } from "./task-list-item";
import styles from "./tasks.module.scss";

export function Tasks() {
  return (
    <div className={styles.tasks}>
      <TaskList>
        <TaskListItem>
          <Typography variant="body1">First</Typography>
        </TaskListItem>
        <TaskListItem>
          <Typography variant="body1">Second</Typography>
        </TaskListItem>
        <TaskListItem>
          <Typography variant="body1">Second</Typography>
        </TaskListItem>
        <TaskListItem>
          <Typography variant="body1">Second</Typography>
        </TaskListItem>
        <TaskListItem>
          <Typography variant="body1">Second</Typography>
        </TaskListItem>
      </TaskList>
      <div className={styles.tasks__actions}>
        <Button variant="secondary" leftIcon={IconAlarm}>
          Add
        </Button>
        <Button variant="secondary" leftIcon={IconTimeDuration0}>
          Add
        </Button>
      </div>
    </div>
  );
}
