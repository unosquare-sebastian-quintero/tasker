import clsx from "clsx";
import { useState } from "react";
import { BaseButton, type BaseButtonProps } from "../base-button/base-button";
import styles from "./toggle-button.module.scss";

export type ToggleButtonProps = BaseButtonProps & {
  defaultPressed?: boolean;
  pressed?: boolean;
  onToggle?: (
    pressed: boolean,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export function ToggleButton({
  defaultPressed,
  pressed,
  onToggle,
  className,
  onClick,
  ...props
}: ToggleButtonProps) {
  const [isPressedInternal, setIsPressedInternal] = useState(defaultPressed);

  const isPressed = pressed != null ? pressed : isPressedInternal;

  function handleButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    onClick?.(event);

    onToggle?.(!isPressed, event);
    setIsPressedInternal((pressed) => {
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
