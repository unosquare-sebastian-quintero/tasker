import { useContext } from "react";
import { MenuContext } from "../context";

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (context == null) {
    throw new Error("Expected to be a child of MenuProvider component");
  }
  return context;
}
