import { Icon, TablerIconsProps } from "@tabler/icons-react";
import clsx from "clsx";
import { BaseButton, BaseButtonProps } from "../base-button/base-button";
import styles from "./icon-button.module.scss";

export type IconButtonProps = Omit<BaseButtonProps, "children"> & {
  variant: "bordered" | "borderless";
  children: React.ReactElement<TablerIconsProps, Icon>;
};

export function IconButton({ variant, className, ...props }: IconButtonProps) {
  return (
    <BaseButton
      {...props}
      className={clsx(className, styles["icon-button"], {
        [styles["icon-button--bordered"]]: variant === "bordered",
      })}
    ></BaseButton>
  );
}
