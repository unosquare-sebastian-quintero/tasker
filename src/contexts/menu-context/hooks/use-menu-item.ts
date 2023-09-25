import { useMemo } from "react";
import { MenuItem, MenuItemRole } from "../state";
import { useCheckRadioItem } from "./use-check-radio-item";
import { useCloseMenu } from "./use-close-menu";
import { useFocusNextItem } from "./use-focus-next-item";
import { useFocusPreviousItem } from "./use-focus-previous-item";
import { useItemIndex } from "./use-item-index";
import { useMenuContext } from "./use-menu-context";
import { useSelectItem } from "./use-select-item";
import { useToggleItemChecked } from "./use-toggle-item-checked";

export function useMenuItem(role: MenuItemRole, value: string) {
  const { state, dispatch } = useMenuContext();

  const index = useItemIndex(dispatch, role, value);
  const item: MenuItem =
    index > -1
      ? state.items[index]
      : {
          isFocused: false,
          isMounted: false,
          isChecked: false,
          role: "menuitem",
          value: "",
        };

  const { isFocused, isChecked } = item;
  const closeMenu = useCloseMenu(dispatch);
  const toggleItemChecked = useToggleItemChecked(dispatch, index);
  const checkRadioItem = useCheckRadioItem(dispatch, index);
  const selectItem = useSelectItem(dispatch, index);
  const focusNextItem = useFocusNextItem(dispatch);
  const focusPreviousItem = useFocusPreviousItem(dispatch);

  return useMemo(
    () => ({
      isFocused,
      isChecked,
      closeMenu,
      toggleItemChecked,
      checkRadioItem,
      selectItem,
      focusNextItem,
      focusPreviousItem,
    }),
    [
      checkRadioItem,
      closeMenu,
      focusNextItem,
      focusPreviousItem,
      isChecked,
      isFocused,
      selectItem,
      toggleItemChecked,
    ],
  );
}
