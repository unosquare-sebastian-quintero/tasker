import { useCallback } from "react";
import { type MenuAction } from "../state";

export function useFocusFirstItem(dispatch: React.Dispatch<MenuAction>) {
  return useCallback(() => dispatch({ type: "focus-first-item" }), [dispatch]);
}
