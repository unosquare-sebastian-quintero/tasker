import clsx from "clsx";
import { useState } from "react";
import { BaseButton, BaseButtonProps } from "../base-button/base-button";
import styles from "./toggle-button.module.scss";

export type ToggleButtonProps = BaseButtonProps & {
  defaultPressed?: boolean;
  onToggle?: (
    pressed: boolean,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export function ToggleButton({
  defaultPressed,
  onToggle,
  className,
  onClick,
  ...props
}: ToggleButtonProps) {
  const [isPressed, setIsPressed] = useState(defaultPressed);

  function handleButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    onClick?.(event);

    setIsPressed((pressed) => {
      onToggle?.(!pressed, event);
      return !pressed;
    });
  }

  return (
    <BaseButton
      {...props}
      className={clsx(className, styles["toggle-button"], {
        [styles["toggle-button--pressed"]]: isPressed,
      })}
      aria-pressed={isPressed}
      onClick={handleButtonClick}
    ></BaseButton>
  );
}
