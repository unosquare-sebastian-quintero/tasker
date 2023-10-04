import { useCallback } from "react";
import { type MenuAction } from "../state";

export function useSelectItem(
  dispatch: React.Dispatch<MenuAction>,
  index: number,
) {
  return useCallback(
    () => dispatch({ type: "select-item", payload: { index } }),
    [dispatch, index],
  );
}
