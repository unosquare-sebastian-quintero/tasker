import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { Backdrop } from "../backdrop/backdrop";
import { IconButton } from "../icon-button/icon-button";
import { Typography } from "../typography/typography";
import styles from "./dialog.module.scss";

export type DialogProps = React.HTMLAttributes<HTMLDivElement> &
  React.PropsWithChildren & {
    title: string;
    onClose?: () => void;
  };

export function Dialog({
  title,
  onClose,
  children,
  className,
  ...props
}: DialogProps) {
  function handleIconButtonClick() {
    onClose?.();
  }

  return (
    <Backdrop>
      <div
        {...props}
        className={clsx(className, styles.dialog)}
        role="dialog"
        aria-modal="true"
      >
        <header className={clsx(styles.dialog__header)}>
          <div className={clsx(styles.dialog__title)}>
            <Typography variant="h2">{title}</Typography>
          </div>

          <div className={clsx(styles.dialog__close)}>
            <IconButton
              variant="borderless"
              className={clsx(styles.dialog__button)}
              onClick={handleIconButtonClick}
            >
              <IconX size={16} />
            </IconButton>
          </div>
        </header>
        {children}
      </div>
    </Backdrop>
  );
}
