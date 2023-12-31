import { cloneElement, useState } from "react";
import { type BaseButtonProps } from "../base-button/base-button";
import { Dialog } from "../dialog/dialog";
import { type Menu, type MenuProps } from "../menu/menu";

export type MenuButtonProps<TProps extends BaseButtonProps = BaseButtonProps> =
  TProps & {
    dialogTitle: string;
    keepMounted?: boolean;
    menu: React.ReactElement<MenuProps, typeof Menu>;
    component: React.ComponentType<TProps>;
  };

export function MenuButton<TProps extends BaseButtonProps = BaseButtonProps>({
  dialogTitle,
  keepMounted,
  menu,
  component: Component,
  onClick,
  onKeyUp,
  ...props
}: MenuButtonProps<TProps>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    openMenu();
  }

  function handleButtonKeyUp(event: React.KeyboardEvent<HTMLButtonElement>) {
    onKeyUp?.(event);

    switch (event.key) {
      case "Enter":
        openMenu();
        break;

      case "Space":
        openMenu();
        break;

      default:
        break;
    }
  }

  function handleDialogClose() {
    closeMenu();
  }

  function handleOptionSelected(value: string) {
    closeMenu();
    menu.props.onOptionSelected?.(value);
  }

  const menuClone = cloneElement(menu, {
    onOptionSelected: handleOptionSelected,
  });

  return (
    <>
      <Component
        {...(props as unknown as TProps)}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onClick={handleButtonClick}
        onKeyUp={handleButtonKeyUp}
      ></Component>
      <Dialog
        open={isMenuOpen}
        keepMounted={keepMounted}
        title={dialogTitle}
        onClose={handleDialogClose}
      >
        {menuClone}
      </Dialog>
    </>
  );
}
