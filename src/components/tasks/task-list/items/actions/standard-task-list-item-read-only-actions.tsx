import { Task } from "../../../../../state/tasks/model";

export type StandardTaskListItemReadOnlyActionsProps = {
  uuid: string;
  task: Task;
};

export function StandardTaskListItemReadOnlyActions({
  uuid,
  task,
}: StandardTaskListItemReadOnlyActionsProps) {
  return (
    <div>
      <span>00.00</span>
    </div>
  );
}
