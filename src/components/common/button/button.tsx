import clsx from "clsx";
import { BaseButton } from "../base-button/base-button";
import classes from "./button.module.scss";

export type ButtonProps = React.ComponentProps<typeof BaseButton> & {
  variant: "primary" | "secondary";
};

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <BaseButton
      {...props}
      className={clsx(className, classes.button, {
        [classes["button--primary"]]: variant === "primary",
        [classes["button--secondary"]]: variant === "secondary",
      })}
    ></BaseButton>
  );
}
