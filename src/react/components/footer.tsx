import { taskerAction } from "../state";
import { BaseButton } from "./common/base-button/base-button";
import styles from "./footer.module.scss";

export function Footer() {
  function handleButtonClick() {
    taskerAction.app.closeWindow();
  }

  return (
    <footer className={styles.footer}>
      <BaseButton
        className={styles.footer__button}
        fullWidth
        onClick={handleButtonClick}
      >
        Close
      </BaseButton>
    </footer>
  );
}
