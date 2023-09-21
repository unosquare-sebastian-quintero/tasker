import clsx from "clsx";
import { Typography } from "../typography/typography";
import styles from "./base-button.module.scss";

export type BaseButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export function BaseButton({ className, children, ...props }: BaseButtonProps) {
  const content =
    typeof children === "string" ? (
      <Typography variant="button">{children}</Typography>
    ) : (
      children
    );

  return (
    <button {...props} className={clsx(className, styles["base-button"])}>
      {content}
    </button>
  );
}
