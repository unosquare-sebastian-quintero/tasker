import { useState } from "react";
import PinIcon from "../assets/pin-icon.svg";
import PinnedIcon from "../assets/pinned-icon.svg";
import classes from "./header.module.scss";
import { Typography } from "./common/typography/typography";

export function Header() {
  const [isPinned, setIsPinned] = useState(false);

  function handleChangeIconClick() {
    window.electron.changeIcon();
  }

  function handleButtonClick() {
    window.electron.togglePinWindow();
    setIsPinned((pinned) => !pinned);
  }

  return (
    <header className={classes.header}>
      <button onClick={handleChangeIconClick}>icon</button>
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
