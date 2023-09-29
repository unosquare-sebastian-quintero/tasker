import { BaseButton } from "./common/base-button/base-button";
import styles from "./footer.module.scss";

export function Footer() {
  function handleButtonClick() {
    // TODO: Close
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
