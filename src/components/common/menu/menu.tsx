import clsx from "clsx";
import { useEffect } from "react";
import { useMenuContext } from "../../../contexts/menu-context/menu-context";
import { MenuItem, MenuItemProps } from "../menu-item/menu-item";
import styles from "./menu.module.scss";

type MenuItemElement = React.ReactElement<MenuItemProps, typeof MenuItem>;

export type MenuProps = React.HTMLAttributes<HTMLUListElement> & {
  children: MenuItemElement | Iterable<MenuItemElement>;
};

export function Menu({ className, ...props }: MenuProps) {
  const { focusFirstItem } = useMenuContext();

  useEffect(() => {
    focusFirstItem();
  }, [focusFirstItem]);

  return (
    <ul {...props} role="menu" className={clsx(className, styles.menu)}></ul>
  );
}
