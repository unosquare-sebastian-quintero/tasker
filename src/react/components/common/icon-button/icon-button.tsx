import { type Icon, type TablerIconsProps } from "@tabler/icons-react";
import clsx from "clsx";
import { BaseButton, type BaseButtonProps } from "../base-button/base-button";
import styles from "./icon-button.module.scss";

export type IconButtonProps = Omit<BaseButtonProps, "children"> & {
  variant: "bordered" | "borderless";
  label: string;
  size?: number;
  children: React.ReactElement<TablerIconsProps, Icon>;
};

export function IconButton({
  variant,
  label,
  size,
  className,
  ...props
}: IconButtonProps) {
  const customStyle = size
    ? ({
        width: `${size}px`,
        height: `${size}px`,
      } satisfies React.CSSProperties)
    : undefined;

  return (
    <BaseButton
      {...props}
      aria-label={label}
      style={customStyle}
      className={clsx(className, styles["icon-button"], {
        [styles["icon-button--bordered"]]: variant === "bordered",
      })}
    ></BaseButton>
  );
}
