import { useCallback } from "react";
import { type MenuAction } from "../state";

export function useFocusNextItem(dispatch: React.Dispatch<MenuAction>) {
  return useCallback(() => dispatch({ type: "focus-next-item" }), [dispatch]);
}
