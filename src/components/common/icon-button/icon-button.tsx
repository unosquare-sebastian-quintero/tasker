import { Icon, TablerIconsProps } from "@tabler/icons-react";
import clsx from "clsx";
import { BaseButton, BaseButtonProps } from "../base-button/base-button";
import styles from "./icon-button.module.scss";

export type IconButtonProps = Omit<BaseButtonProps, "children"> & {
  variant: "bordered" | "borderless";
  label: string;
  children: React.ReactElement<TablerIconsProps, Icon>;
};

export function IconButton({
  variant,
  label,
  className,
  ...props
}: IconButtonProps) {
  return (
    <BaseButton
      {...props}
      aria-label={label}
      className={clsx(className, styles["icon-button"], {
        [styles["icon-button--bordered"]]: variant === "bordered",
      })}
    ></BaseButton>
  );
}
