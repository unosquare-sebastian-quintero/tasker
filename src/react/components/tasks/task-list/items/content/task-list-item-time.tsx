import { type TaskItem } from "../../../../../../models/tasks";
import { secondsToHoursString } from "../../../../../utilities/time-utils";
import { Typography } from "../../../../common/typography/typography";

export type TaskListItemTimeProps = {
  task: TaskItem;
};

export function TaskListItemTime({
  task,
}: TaskListItemTimeProps) {
  return (
    <Typography variant="body1" className="font-sans">
      {secondsToHoursString(task.time)}
    </Typography>
  );
}
