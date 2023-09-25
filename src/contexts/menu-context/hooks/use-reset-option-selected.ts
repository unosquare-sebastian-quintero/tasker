import { useCallback } from "react";
import { MenuAction } from "../state";

export function useResetOptionSelected(dispatch: React.Dispatch<MenuAction>) {
  return useCallback(
    () => dispatch({ type: "reset-option-selected" }),
    [dispatch],
  );
}
