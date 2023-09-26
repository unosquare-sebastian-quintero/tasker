import { BaseButton } from "./common/base-button/base-button";
import classes from "./footer.module.scss";

export function Footer() {
  function handleButtonClick() {
    // TODO: Close
  }

  return (
    <footer className={classes.footer}>
      <BaseButton
        className={classes.footer__button}
        onClick={handleButtonClick}
      >
        Close
      </BaseButton>
    </footer>
  );
}
