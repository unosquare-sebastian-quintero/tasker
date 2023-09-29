import { useEffect, useState } from "react";
import { MenuAction, MenuItemRole } from "../state";
import { useMountMenuItem } from "./use-mount-menu-item";

export function useItemIndex(
  dispatch: React.Dispatch<MenuAction>,
  role: MenuItemRole,
  value: string,
) {
  const [itemIndex, setItemIndex] = useState<number>(-1);

  const mount = useMountMenuItem(dispatch);

  useEffect(() => {
    const { index, unmount } = mount(itemIndex, value, role);
    setItemIndex(index);

    return () => {
      unmount();
    };
  }, [itemIndex, mount, role, value]);

  return itemIndex;
}
