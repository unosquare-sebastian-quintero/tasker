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
  onOptionSelected?: () => void;
};

export function MenuItem({
  variant,
  value,
  disabled,
  onCheckChange,
  onOptionSelected,
  className,
  onClick,
  onKeyDown,
  onKeyUp,
  ...props
}: MenuItemProps) {
  const role = ROLE_VARIANT_MAP[variant];
  const isCheckable = role === "menuitemcheckbox" || role === "menuitemradio";

  const {
    tabPressed,
    isFocused,
    isChecked,
    tabPress,
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
    if (isCheckable) {
      toggleItemChecked();
      onCheckChange?.(!isChecked, event);
    }
  }

  function selectOption() {
    onOptionSelected?.();
    selectItem();
  }

  function handleItemClick(event: React.MouseEvent<HTMLLIElement>) {
    onClick?.(event);
    toggleChecked(event);
    selectOption();
  }

  function handleItemKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
    onKeyDown?.(event);

    switch (event.key) {
      case "Tab":
        tabPress();
        closeMenu();
        break;

      default:
        break;
    }
  }

  function handleItemKeyUp(event: React.KeyboardEvent<HTMLLIElement>) {
    onKeyUp?.(event);

    switch (event.key) {
      case "Enter":
        selectOption();
        break;

      case " ":
        if (role === "menuitemcheckbox") {
          toggleChecked(event);
        } else if (role === "menuitemradio") {
          checkRadioItem();
        } else {
          selectOption();
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
      tabIndex={tabPressed ? -1 : 0}
      className={clsx(className, styles["menu-item"])}
      onClick={handleItemClick}
      onKeyDown={handleItemKeyDown}
      onKeyUp={handleItemKeyUp}
    ></li>
  );
}
