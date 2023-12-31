import { useCallback } from "react";
import { type MenuAction } from "../state";

export function useCloseMenu(dispatch: React.Dispatch<MenuAction>) {
  return useCallback(() => dispatch({ type: "close-menu" }), [dispatch]);
}
