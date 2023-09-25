import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

type ItemId = number;

type ItemRole = "menuitem" | "menuitemradio" | "menuitemcheckbox";

type Context = {
  focusFirstItem: () => void;
  focusNextItem: () => void;
  focusPreviousItem: () => void;
  closeMenu: () => void;
  checkRadioItem: (id: ItemId) => void;
  selectItem: (id: ItemId) => void;
  registerMenuItem: (
    itemId: ItemId,
    role: ItemRole,
  ) => { id: ItemId; unregister: () => void };
};

const MenuContext = createContext<Context | null>(null);

type ContextItem = {
  role: ItemRole;
  isValid: boolean;
  isChecked?: boolean;
};

type State = {
  items: ContextItem[];
  focusAt: ItemId;
  selectedAt: ItemId;
};

type FocusFirstItemAction = {
  type: "focus-first-item";
};

type FocusNextItemAction = {
  type: "focus-next-item";
};

type FocusPreviousItemAction = {
  type: "focus-previous-item";
};

type CloseMenuAction = {
  type: "close-menu";
};

type CheckRadioItemAction = {
  type: "check-radio-item";
  payload: { id: ItemId };
};

type SelectItemAction = {
  type: "select-item";
  payload: { id: ItemId };
};

type RegisterMenuItemAction = {
  type: "register-menu-item";
  payload: {
    id: ItemId;
    role: ItemRole;
  };
};

type UnregisterMenuItemAction = {
  type: "unregister-menu-item";
  payload: {
    id: ItemId;
  };
};

type Action =
  | FocusFirstItemAction
  | FocusNextItemAction
  | FocusPreviousItemAction
  | CloseMenuAction
  | CheckRadioItemAction
  | SelectItemAction
  | RegisterMenuItemAction
  | UnregisterMenuItemAction;

const initialArg: State = {
  items: [],
  focusAt: 0,
  selectedAt: -1,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "focus-first-item":
      return state;

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export type MenuContextProviderProps = React.PropsWithChildren;

export function MenuContextProvider({ children }: MenuContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialArg);

  const focusFirstItem = useCallback(
    () => dispatch({ type: "focus-first-item" }),
    [],
  );

  const focusNextItem = useCallback(
    () => dispatch({ type: "focus-next-item" }),
    [],
  );

  const focusPreviousItem = useCallback(
    () => dispatch({ type: "focus-previous-item" }),
    [],
  );

  const closeMenu = useCallback(() => dispatch({ type: "close-menu" }), []);

  const checkRadioItem = useCallback(
    (id: ItemId) => dispatch({ type: "check-radio-item", payload: { id } }),
    [],
  );

  const selectItem = useCallback(
    (id: ItemId) => dispatch({ type: "select-item", payload: { id } }),
    [],
  );

  const registerMenuItem = useCallback(
    (itemId: ItemId, role: ItemRole) => {
      let id = itemId;
      if (itemId < 0) {
        id = state.items.length;
      }

      dispatch({
        type: "register-menu-item",
        payload: {
          id,
          role,
        },
      });

      return {
        id,
        unregister: () =>
          dispatch({ type: "unregister-menu-item", payload: { id } }),
      };
    },
    [state.items.length],
  );

  const value: Context = {
    focusFirstItem,
    focusNextItem,
    focusPreviousItem,
    closeMenu,
    checkRadioItem,
    selectItem,
    registerMenuItem,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (context == null) {
    throw new Error("Expected to be a child of MenuContextProvider component");
  }
  return context;
}

export function useMenuContextItem(role: ItemRole) {
  const [itemId, setItemId] = useState<ItemId>(-1);
  const { registerMenuItem } = useMenuContext();

  useEffect(() => {
    const { id, unregister } = registerMenuItem(itemId, role);
    setItemId(id);

    return () => {
      unregister();
    };
  }, [itemId, registerMenuItem, role]);

  return { itemId };
}
