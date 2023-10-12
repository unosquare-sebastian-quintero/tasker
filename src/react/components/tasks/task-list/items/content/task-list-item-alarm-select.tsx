import { taskerAction, useTaskerStore } from "../../../../../state";
import {
  getAvailableDayMinutes,
  timeNumberToString,
  timeStringToNumber,
} from "../../../../../utilities/time-utils";
import { Select } from "../../../../common/select/select";

export type TaskListItemAlarmSelectProps = {
  uuid: string;
};

export function TaskListItemAlarmSelect({
  uuid,
}: TaskListItemAlarmSelectProps) {
  const time = useTaskerStore((state) => state.task.items[uuid].time);
  const value = timeNumberToString(time);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newTime = timeStringToNumber(event.target.value);

    taskerAction.task.updateTask(uuid, {
      time: newTime,
    });
  }

  const options = getAvailableDayMinutes().map(timeNumberToString);

  return (
    <Select onChange={handleSelectChange} value={value}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </Select>
  );
}
