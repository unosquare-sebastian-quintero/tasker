import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useMenuItem } from "../../../contexts/menu-context";
import styles from "./menu-item.module.scss";

type Variant = "default" | "radio" | "checkbox";

type Role = "menuitem" | "menuitemradio" | "menuitemcheckbox";

const ROLE_VARIANT_MAP: Record<Variant, Role> = {
  default: "menuitem",
  radio: "menuitemradio",
  checkbox: "menuitemcheckbox",
};

function getAriaProps(variant: Variant, checked: boolean, disabled?: boolean) {
  const role = ROLE_VARIANT_MAP[variant];
  const ariaProps: React.AriaAttributes = {};

  if (disabled) {
    ariaProps["aria-disabled"] = true;
  }

  if (role === "menuitemcheckbox" || role === "menuitemradio") {
    ariaProps["aria-checked"] = checked;
  }

  return ariaProps;
}

export type MenuItemProps = React.HTMLAttributes<HTMLLIElement> & {
  variant: Variant;
  value: string;
  disabled?: boolean;
  onCheckChange?: (
    checked: boolean,
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
};

export function MenuItem({
  variant,
  value,
  disabled,
  onCheckChange,
  className,
  onClick,
  onKeyUp,
  ...props
}: MenuItemProps) {
  const role = ROLE_VARIANT_MAP[variant];

  const {
    isFocused,
    isChecked,
    closeMenu,
    toggleItemChecked,
    checkRadioItem,
    selectItem,
    focusNextItem,
    focusPreviousItem,
  } = useMenuItem(role, value);

  const liRef = useRef<HTMLLIElement>(null);
  const ariaProps = getAriaProps(variant, isChecked, disabled);

  useEffect(() => {
    if (isFocused) {
      liRef.current?.focus();
    }
  }, [isFocused]);

  function toggleChecked(
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) {
    if (role === "menuitemcheckbox" || role === "menuitemradio") {
      toggleItemChecked();
      onCheckChange?.(!isChecked, event);
    }
  }

  function handleItemClick(event: React.MouseEvent<HTMLLIElement>) {
    onClick?.(event);
    toggleChecked(event);
    selectItem();
  }

  function handleItemKeyUp(event: React.KeyboardEvent<HTMLLIElement>) {
    onKeyUp?.(event);

    switch (event.key) {
      case "Tab":
        closeMenu();
        break;

      case "Enter":
        selectItem();
        break;

      case " ":
        if (role === "menuitemcheckbox") {
          toggleChecked(event);
        } else if (role === "menuitemradio") {
          checkRadioItem();
        } else {
          selectItem();
          closeMenu();
        }
        break;

      case "ArrowDown":
        focusNextItem();
        break;

      case "ArrowUp":
        focusPreviousItem();
        break;

      case "Escape":
        closeMenu();
        break;

      default:
        break;
    }
  }

  return (
    <li
      {...props}
      {...ariaProps}
      ref={liRef}
      role={role}
      tabIndex={0}
      className={clsx(className, styles["menu-item"])}
      onClick={handleItemClick}
      onKeyUp={handleItemKeyUp}
    ></li>
  );
}
