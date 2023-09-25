import { useCallback } from "react";
import { MenuAction, MenuItemRole } from "../state";
import { useMenuItemCountContext } from "./use-menu-item-count-context";

export function useMountMenuItem(dispatch: React.Dispatch<MenuAction>) {
  const countRef = useMenuItemCountContext();

  return useCallback(
    (itemIndex: number, value: string, role: MenuItemRole) => {
      let index = itemIndex;
      if (itemIndex < 0) {
        index = countRef.current++;
      }

      dispatch({
        type: "mount-menu-item",
        payload: {
          index,
          value,
          role,
        },
      });

      return {
        index,
        unmount: () =>
          dispatch({ type: "unmount-menu-item", payload: { index } }),
      };
    },
    [countRef, dispatch],
  );
}
