import clsx from "clsx";
import classes from "./button.module.scss";

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "dense";
};

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(className, classes.button, {
        [classes["button--default"]]: variant === "default",
        [classes["button--dense"]]: variant === "dense",
      })}
    ></button>
  );
}
