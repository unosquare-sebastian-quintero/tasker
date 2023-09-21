import { Icon } from "@tabler/icons-react";
import clsx from "clsx";
import { BaseButton, BaseButtonProps } from "../base-button/base-button";
import classes from "./button.module.scss";

function renderIcon(IconComponent?: Icon | null) {
  if (IconComponent == null) {
    return null;
  }

  return <IconComponent size={16} />;
}

export type ButtonProps = BaseButtonProps & {
  variant: "primary" | "secondary";
  leftIcon?: Icon;
  rightIcon?: Icon;
};

export function Button({
  variant,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const leftIconElement = renderIcon(leftIcon);
  const rightIconElement = renderIcon(rightIcon);

  return (
    <BaseButton
      {...props}
      className={clsx(className, classes.button, {
        [classes["button--primary"]]: variant === "primary",
        [classes["button--secondary"]]: variant === "secondary",
      })}
    >
      {leftIconElement}
      {children}
      {rightIconElement}
    </BaseButton>
  );
}
