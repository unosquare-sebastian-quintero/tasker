import { useState } from "react";
import { BaseButton } from "./common/base-button/base-button";
import classes from "./footer.module.scss";

export function Footer() {
  const [hasStarted, setHasStarted] = useState(false);

  function handleButtonClick() {
    setHasStarted((started) => !started);
  }

  return (
    <footer className={classes.footer}>
      <BaseButton onClick={handleButtonClick}>
        {hasStarted ? "Done" : "Start"}
      </BaseButton>
    </footer>
  );
}
