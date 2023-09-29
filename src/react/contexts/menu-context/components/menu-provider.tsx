import { useMemo, useReducer, useRef } from "react";
import { MenuContext, MenuItemCountContext } from "../context";
import { intialMenuState, menuReducer } from "../state";

export type MenuProviderProps = React.PropsWithChildren;

export function MenuProvider({ children }: MenuProviderProps) {
  const countRef = useRef(0);
  const [state, dispatch] = useReducer(menuReducer, intialMenuState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <MenuItemCountContext.Provider value={countRef}>
      <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
    </MenuItemCountContext.Provider>
  );
}
