import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  useMenuContext,
  useMenuContextItem,
} from "../../../contexts/menu-context/menu-context";
import styles from "./menu-item.module.scss";

type Variant = "default" | "radio" | "checkbox";

type Role = "menuitem" | "menuitemradio" | "menuitemcheckbox";

const ROLE_VARIANT_MAP: Record<Variant, Role> = {
  default: "menuitem",
  radio: "menuitemradio",
  checkbox: "menuitemcheckbox",
};

function getInitialAriaProps(variant: Variant, disabled?: boolean) {
  const role = ROLE_VARIANT_MAP[variant];
  const ariaProps: React.AriaAttributes = {};

  if (disabled) {
    ariaProps["aria-disabled"] = true;
  }

  if (role === "menuitemcheckbox" || role === "menuitemradio") {
    ariaProps["aria-checked"] = false;
  }

  return ariaProps;
}

export type MenuItemProps = React.HTMLAttributes<HTMLLIElement> & {
  variant: Variant;
  disabled?: boolean;
  onCheckChange?: (
    checked: boolean,
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => void;
};

export function MenuItem({
  variant,
  disabled,
  onCheckChange,
  className,
  onClick,
  onKeyUp,
  ...props
}: MenuItemProps) {
  const role = ROLE_VARIANT_MAP[variant];

  const {
    closeMenu,
    checkRadioItem,
    selectItem,
    focusNextItem,
    focusPreviousItem,
  } = useMenuContext();
  const { itemId } = useMenuContextItem(role);

  const [ariaProps, setAriaProps] = useState<React.AriaAttributes>(
    getInitialAriaProps(variant, disabled),
  );

  useEffect(() => {
    setAriaProps((prevAriaProps) => ({
      ...prevAriaProps,
      "aria-disabled": disabled,
    }));
  }, [disabled]);

  function toggleChecked(
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) {
    if (role === "menuitemcheckbox" || role === "menuitemradio") {
      setAriaProps((prevAriaProps) => {
        const nextChecked = !prevAriaProps["aria-checked"];
        onCheckChange?.(nextChecked, event);
        return {
          ...prevAriaProps,
          "aria-checked": nextChecked,
        };
      });
    }
  }

  function handleItemClick(event: React.MouseEvent<HTMLLIElement>) {
    onClick?.(event);
    toggleChecked(event);
  }

  function handleItemKeyUp(event: React.KeyboardEvent<HTMLLIElement>) {
    onKeyUp?.(event);

    switch (event.key) {
      case "Tab":
        closeMenu();
        break;

      case "Enter":
        selectItem(itemId);
        break;

      case " ":
        if (role === "menuitemcheckbox") {
          toggleChecked(event);
        } else if (role === "menuitemradio") {
          checkRadioItem(itemId);
        } else {
          selectItem(itemId);
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
      role={role}
      tabIndex={0}
      className={clsx(className, styles["menu-item"])}
      onClick={handleItemClick}
      onKeyUp={handleItemKeyUp}
    ></li>
  );
}
