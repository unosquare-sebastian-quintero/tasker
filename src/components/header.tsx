import { useState } from "react";
import PinIcon from "../assets/pin-icon.svg";
import PinnedIcon from "../assets/pinned-icon.svg";
import classes from "./header.module.scss";
import { Typography } from "./typography";

export function Header() {
  const [isPinned, setIsPinned] = useState(false);
  function handleButtonClick() {
    window.electron.togglePinWindow();
    setIsPinned((pinned) => !pinned);
  }

  return (
    <header className={classes.header}>
      <Typography variant="h1">Date</Typography>
      <button className={classes.header__pin} onClick={handleButtonClick}>
        <img
          className={classes.header__img}
          src={isPinned ? PinnedIcon : PinIcon}
          alt=""
        />
      </button>
    </header>
  );
}
