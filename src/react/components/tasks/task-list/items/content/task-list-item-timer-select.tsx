import { taskerAction, useTaskerStore } from "../../../../../state";
import { Select } from "../../../../common/select/select";

export type TaskListItemTimerSelectProps = {
  uuid: string;
};

export function TaskListItemTimerSelect({
  uuid,
}: TaskListItemTimerSelectProps) {
  const time = useTaskerStore((state) => state.task.items[uuid].time);
  const value = time.toString();

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newTime = parseInt(event.target.value);

    taskerAction.task.updateTask(uuid, {
      time: newTime,
    });
  }

  return (
    <Select onChange={handleSelectChange} value={value}>
      <option value="10">10 sec</option>
      <option value="20">20 sec</option>
      <option value="30">30 sec</option>
      <option value="40">40 sec</option>
      <option value="50">50 sec</option>
      <option value="60">1 min</option>
      <option value="600">10 min</option>
      <option value="1200">20 min</option>
      <option value="1800">30 min</option>
      <option value="2400">40 min</option>
      <option value="3000">50 min</option>
      <option value="3600">1 hour</option>
    </Select>
  );
}
