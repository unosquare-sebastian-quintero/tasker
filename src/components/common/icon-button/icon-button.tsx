import { Icon, TablerIconsProps } from "@tabler/icons-react";
import clsx from "clsx";
import { BaseButton, BaseButtonProps } from "../base-button/base-button";
import styles from "./icon-button.module.scss";

export type IconButtonProps = Omit<BaseButtonProps, "children"> & {
  children: React.ReactElement<TablerIconsProps, Icon>;
};

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <BaseButton
      {...props}
      className={clsx(className, styles["icon-button"])}
    ></BaseButton>
  );
}
