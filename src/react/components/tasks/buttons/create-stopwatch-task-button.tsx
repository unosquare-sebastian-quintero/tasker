import { IconClock } from "@tabler/icons-react";
import { taskerAction } from "../../../state";
import { Button } from "../../common/button/button";

export function CreateStopwatchTaskButton() {
  function handleButtonClick() {
    taskerAction.task.addTask({
      type: "stopwatch",
      label: "New Stopwatch",
      state: "idle",
      time: 0,
      actions: [],
    });
  }

  return (
    <Button
      variant="secondary"
      onClick={handleButtonClick}
      leftIcon={IconClock}
    >
      Stopwatch
    </Button>
  );
}
