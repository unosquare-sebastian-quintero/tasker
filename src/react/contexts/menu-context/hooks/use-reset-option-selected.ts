import { useCallback } from "react";
import { type MenuAction } from "../state";

export function useResetOptionSelected(dispatch: React.Dispatch<MenuAction>) {
  return useCallback(
    () => dispatch({ type: "reset-option-selected" }),
    [dispatch],
  );
}
