import { IconBell } from "@tabler/icons-react";
import { taskerAction } from "../../../state";
import { Button } from "../../common/button/button";

export function CreateTimerTaskButton() {
  function handleButtonClick() {
    taskerAction.task.addTask({
      type: "timer",
      label: "New Timer",
      state: "idle",
      time: 10,
      actions: [],
    });
  }

  return (
    <Button variant="primary" onClick={handleButtonClick} leftIcon={IconBell}>
      Timer
    </Button>
  );
}
