import { IconPin, IconPinned } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTaskerStore } from "../state";
import { IconButton } from "./common/icon-button/icon-button";
import { Typography } from "./common/typography/typography";
import styles from "./header.module.scss";

export function Header() {
  const defaultPinned = useTaskerStore((state) => state.app.window.isPinned);
  const [isPinned, setIsPinned] = useState(defaultPinned);

  useEffect(() => {
    console.log({ defaultPinned });
    setIsPinned(defaultPinned);
  }, [defaultPinned]);

  function handleButtonClick() {
    window.tasker.togglePinWindow();
    setIsPinned((pinned) => !pinned);
  }

  return (
    <header className={styles.header}>
      <Typography variant="h1">Tasker</Typography>
      <div className={styles.header__action}>
        <IconButton
          variant="borderless"
          label={isPinned ? "Unpin window" : "Pin window"}
          onClick={handleButtonClick}
        >
          {isPinned ? <IconPinned size={16} /> : <IconPin size={16} />}
        </IconButton>
      </div>
    </header>
  );
}
