import { useCallback } from "react";
import { MenuAction } from "../state";

export function useCheckRadioItem(
  dispatch: React.Dispatch<MenuAction>,
  index: number,
) {
  return useCallback(
    () => dispatch({ type: "check-radio-item", payload: { index } }),
    [dispatch, index],
  );
}
