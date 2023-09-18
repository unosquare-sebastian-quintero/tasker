import clsx from "clsx";
import classes from "./button.module.scss";

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "dense";
};

export function Button({ variant = "default", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(classes.button, {
        [classes["button--dense"]]: variant === "dense",
      })}
    ></button>
  );
}
