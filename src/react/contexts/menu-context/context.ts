import { createContext } from "react";
import { type MenuAction, type MenuState } from "./state";

export type MenuItemCountContext = React.MutableRefObject<number>;

export const MenuItemCountContext = createContext<MenuItemCountContext | null>(
  null,
);

export type MenuContextType = {
  state: MenuState;
  dispatch: React.Dispatch<MenuAction>;
};

export const MenuContext = createContext<MenuContextType | null>(null);
