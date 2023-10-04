import { useCallback } from "react";
import { type MenuAction } from "../state";

export function useResetShouldClose(dispatch: React.Dispatch<MenuAction>) {
  return useCallback(
    () => dispatch({ type: "reset-should-close" }),
    [dispatch],
  );
}
