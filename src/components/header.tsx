import { Button } from "./button";
import classes from "./header.module.scss";
import { Typography } from "./typography";

export function Header() {
  return (
    <header className={classes.header}>
      <Typography variant="h1">Date</Typography>
      <button
        onClick={() => {
          window.electron.pinWindow();
        }}
      >
        Pin/Unpin
      </button>
    </header>
  );
}
