import clsx from "clsx";
import { Children } from "react";
import { Typography } from "../typography/typography";
import styles from "./base-button.module.scss";

export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export function BaseButton({
  fullWidth,
  className,
  children,
  ...props
}: BaseButtonProps) {
  return (
    <button
      {...props}
      className={clsx(className, styles["base-button"], {
        [styles["base-button--full-width"]]: !!fullWidth,
      })}
    >
      {Children.map(children, (child) => {
        if (typeof child !== "string") {
          return child;
        }

        return <Typography variant="button">{child}</Typography>;
      })}
    </button>
  );
}
