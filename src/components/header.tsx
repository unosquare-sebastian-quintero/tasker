import classes from "./header.module.scss";
import { Typography } from "./typography";

export function Header() {
  return (
    <header className={classes.header}>
      <Typography variant="h1">Date</Typography>
    </header>
  );
}
