import clsx from "clsx";
import { Children } from "react";
import { Typography } from "../typography/typography";
import styles from "./base-button.module.scss";

export type BaseButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export function BaseButton({ className, children, ...props }: BaseButtonProps) {
  return (
    <button {...props} className={clsx(className, styles["base-button"])}>
      {Children.map(children, (child) => {
        if (typeof child !== "string") {
          return child;
        }

        return <Typography variant="button">{child}</Typography>;
      })}
    </button>
  );
}
