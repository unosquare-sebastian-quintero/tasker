import { useCallback } from "react";
import { MenuAction } from "../state";

export function useToggleItemChecked(
  dispatch: React.Dispatch<MenuAction>,
  index: number,
) {
  return useCallback(
    () => dispatch({ type: "toggle-item-checked", payload: { index } }),
    [dispatch, index],
  );
}
