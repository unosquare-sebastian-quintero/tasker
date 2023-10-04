import {
  IconPlayerPause,
  IconPlayerPlay,
  type Icon,
  type TablerIconsProps,
} from "@tabler/icons-react";
import { type TaskItem } from "../../../../../../models/tasks";
import { IconButton } from "../../../../common/icon-button/icon-button";

const STATE_ICON_MAP: Record<
  TaskItem["state"],
  React.ReactElement<TablerIconsProps, Icon> | null
> = {
  idle: <IconPlayerPlay />,
  paused: <IconPlayerPlay />,
  running: <IconPlayerPause />,
  stopped: null,
  finished: null,
};

export type TaskListItemPlayPauseButtonProps = {
  uuid: string;
  task: TaskItem;
};

export function TaskListItemPlayPauseButton({
  uuid,
  task,
}: TaskListItemPlayPauseButtonProps) {
  const icon = STATE_ICON_MAP[task.state];

  function handlePlayPauseButtonClick() {
    console.log(uuid);
  }

  if (icon == null) {
    return null;
  }

  return (
    <IconButton
      variant="bordered"
      label="Start"
      size={32}
      onClick={handlePlayPauseButtonClick}
    >
      {icon}
    </IconButton>
  );
}
