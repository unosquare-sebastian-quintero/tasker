import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { useLifecycleLog } from "../../../hooks/use-lifecycle-log";
import { Backdrop } from "../backdrop/backdrop";
import { IconButton } from "../icon-button/icon-button";
import { Typography } from "../typography/typography";
import styles from "./dialog.module.scss";

export type DialogProps = React.HTMLAttributes<HTMLDivElement> &
  React.PropsWithChildren & {
    open: boolean;
    keepMounted?: boolean;
    title: string;
    onClose?: () => void;
  };

export function Dialog({
  open,
  keepMounted,
  title,
  onClose,
  children,
  className,
  ...props
}: DialogProps) {
  useLifecycleLog(
    Dialog,
    { open, keepMounted, title, onClose, children, className, ...props },
    console.log,
  );

  function handleCloseAction() {
    onClose?.();
  }

  if (!keepMounted && !open) {
    return null;
  }

  return (
    <Backdrop
      className={clsx({ none: keepMounted && !open })}
      onClose={handleCloseAction}
    >
      <div
        {...props}
        className={clsx(className, styles.dialog)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className={clsx(styles.dialog__header)}>
          <div className={clsx(styles.dialog__title)}>
            <Typography variant="h2">{title}</Typography>
          </div>

          <div className={clsx(styles.dialog__close)}>
            <IconButton
              variant="borderless"
              label="Close"
              className={clsx(styles.dialog__button)}
              onClick={handleCloseAction}
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
