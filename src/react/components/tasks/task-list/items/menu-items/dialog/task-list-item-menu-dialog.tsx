import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "../../../../../common/button/button";
import { Dialog } from "../../../../../common/dialog/dialog";
import { MenuItem } from "../../../../../common/menu-item/menu-item";
import styles from "./task-list-item-menu-dialog.module.scss";

export type TaskListItemMenuDialogProps = React.PropsWithChildren & {
  value: string;
  menuContent: React.ReactNode;
  onClose?: () => void;
  onSave?: () => void;
};

export function TaskListItemMenuDialog({
  value,
  menuContent,
  children,
  onClose,
  onSave,
}: TaskListItemMenuDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleMenuItemSelected() {
    setIsOpen(true);
  }

  function handleDialogClose() {
    setIsOpen(false);
    onClose?.();
  }

  function handleButtonClick() {
    setIsOpen(false);
    onSave?.();
  }

  return (
    <>
      <MenuItem
        variant="default"
        value={value}
        onOptionSelected={handleMenuItemSelected}
      >
        {menuContent}
      </MenuItem>
      <Dialog open={isOpen} title="Reminder Config" onClose={handleDialogClose}>
        <div className={styles.content}>
          {children}

          <Button
            variant="primary"
            fullWidth
            rightIcon={IconDeviceFloppy}
            onClick={handleButtonClick}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
}
