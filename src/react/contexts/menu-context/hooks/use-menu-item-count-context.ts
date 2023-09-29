import { useContext } from "react";
import { MenuItemCountContext } from "../context";

export function useMenuItemCountContext() {
  const countRef = useContext(MenuItemCountContext);
  if (countRef == null) {
    throw new Error("Expected to be a child of MenuProvider component");
  }
  return countRef;
}
