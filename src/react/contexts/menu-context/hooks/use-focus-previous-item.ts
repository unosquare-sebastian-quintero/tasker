import { useCallback } from "react";
import { type MenuAction } from "../state";

export function useFocusPreviousItem(dispatch: React.Dispatch<MenuAction>) {
  return useCallback(
    () => dispatch({ type: "focus-previous-item" }),
    [dispatch],
  );
}
