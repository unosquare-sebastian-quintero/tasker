import { useCallback, useMemo } from "react";
import { type MenuItem, type MenuItemRole } from "../state";
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

  const { tabPressed } = state;
  const { isFocused, isChecked } = item;
  const tabPress = useCallback(
    () => dispatch({ type: "tab-press-action" }),
    [dispatch],
  );
  const closeMenu = useCloseMenu(dispatch);
  const toggleItemChecked = useToggleItemChecked(dispatch, index);
  const checkRadioItem = useCheckRadioItem(dispatch, index);
  const selectItem = useSelectItem(dispatch, index);
  const focusNextItem = useFocusNextItem(dispatch);
  const focusPreviousItem = useFocusPreviousItem(dispatch);

  return useMemo(
    () => ({
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
    }),
    [
      checkRadioItem,
      closeMenu,
      focusNextItem,
      focusPreviousItem,
      isChecked,
      isFocused,
      selectItem,
      tabPress,
      tabPressed,
      toggleItemChecked,
    ],
  );
}
