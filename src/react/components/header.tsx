import { IconPin, IconPinned } from "@tabler/icons-react";
import { useState } from "react";
import { IconButton } from "./common/icon-button/icon-button";
import { Typography } from "./common/typography/typography";
import styles from "./header.module.scss";

export function Header() {
  const [isPinned, setIsPinned] = useState(false);

  function handleButtonClick() {
    window.electron.togglePinWindow();
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
