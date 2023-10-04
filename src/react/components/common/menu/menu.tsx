import clsx from "clsx";
import { useEffect } from "react";
import { useMenu, withMenuProvider } from "../../../contexts/menu-context";
import { type MenuItem, type MenuItemProps } from "../menu-item/menu-item";
import styles from "./menu.module.scss";

type MenuItemElement = React.ReactElement<MenuItemProps, typeof MenuItem>;

export type MenuProps = React.HTMLAttributes<HTMLUListElement> & {
  children: MenuItemElement | Iterable<MenuItemElement>;
  onOptionSelected?: (value: string) => void;
  onClose?: () => void;
};

export const Menu = withMenuProvider(function Menu({
  className,
  onOptionSelected,
  onClose,
  ...props
}: MenuProps) {
  const {
    optionSelected,
    shouldClose,
    focusFirstItem,
    resetOptionSelected,
    resetShouldClose,
  } = useMenu();

  useEffect(() => {
    if (optionSelected != null) {
      onOptionSelected?.(optionSelected);
      resetOptionSelected();
    }
  }, [onOptionSelected, optionSelected, resetOptionSelected]);

  useEffect(() => {
    if (shouldClose) {
      onClose?.();
      resetShouldClose();
    }
  }, [onClose, resetShouldClose, shouldClose]);

  useEffect(() => {
    focusFirstItem();
  }, [focusFirstItem]);

  return (
    <ul {...props} role="menu" className={clsx(className, styles.menu)}></ul>
  );
});
