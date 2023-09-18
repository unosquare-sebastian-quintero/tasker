import { useState } from "react";
import { Button } from "./button";
import classes from "./footer.module.scss";

export function Footer() {
  const [hasStarted, setHasStarted] = useState(false);

  function handleButtonClick() {
    setHasStarted((started) => !started);
  }

  return (
    <footer className={classes.footer}>
      <Button variant="dense" onClick={handleButtonClick}>
        {hasStarted ? "Done" : "Start"}
      </Button>
    </footer>
  );
}
