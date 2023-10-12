import { IconAlarm } from "@tabler/icons-react";
import { taskerAction } from "../../../state";
import { Button } from "../../common/button/button";

export function CreateAlarmTaskButton() {
  function handleButtonClick() {
    taskerAction.task.addTask({
      type: "alarm",
      label: "New Alarm",
      state: "idle",
      time: 0,
      actions: [],
    });
  }

  return (
    <Button
      variant="secondary"
      onClick={handleButtonClick}
      leftIcon={IconAlarm}
    >
      Alarm
    </Button>
  );
}
