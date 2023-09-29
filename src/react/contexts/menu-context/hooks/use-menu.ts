import { useMemo } from "react";
import { useFocusFirstItem } from "./use-focus-first-item";
import { useMenuContext } from "./use-menu-context";
import { useResetOptionSelected } from "./use-reset-option-selected";
import { useResetShouldClose } from "./use-reset-should-close";

export function useMenu() {
  const { state, dispatch } = useMenuContext();

  const { optionSelected, shouldClose } = state;
  const focusFirstItem = useFocusFirstItem(dispatch);
  const resetShouldClose = useResetShouldClose(dispatch);
  const resetOptionSelected = useResetOptionSelected(dispatch);

  return useMemo(
    () => ({
      optionSelected,
      shouldClose,
      focusFirstItem,
      resetShouldClose,
      resetOptionSelected,
    }),
    [
      focusFirstItem,
      optionSelected,
      resetOptionSelected,
      resetShouldClose,
      shouldClose,
    ],
  );
}
