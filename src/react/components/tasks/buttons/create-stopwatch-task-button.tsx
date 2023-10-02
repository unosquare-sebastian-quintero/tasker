import { IconClock } from "@tabler/icons-react";
import { useStore } from "../../../state";
import { Button } from "../../common/button/button";

export function CreateStopwatchTaskButton() {
  const addTask = useStore((state) => state.addTask);

  function handleButtonClick() {
    addTask({
      type: "stopwatch",
      label: "New Stopwatch",
      state: "idle",
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
