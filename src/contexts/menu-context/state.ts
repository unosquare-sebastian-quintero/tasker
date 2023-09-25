import { produce } from "immer";

export type MenuItemRole = "menuitem" | "menuitemradio" | "menuitemcheckbox";

export type MenuItem = {
  value: string;
  role: MenuItemRole;
  isMounted: boolean;
  isFocused: boolean;
  isChecked: boolean;
};

export type MenuState = {
  shouldClose: boolean;
  optionSelected: string | null;
  items: MenuItem[];
};

type UnknownAction = {
  type: string;
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

type ResetShouldCloseAction = {
  type: "reset-should-close";
};

type ToggleItemCheckedAction = {
  type: "toggle-item-checked";
  payload: { index: number };
};

type CheckRadioItemAction = {
  type: "check-radio-item";
  payload: { index: number };
};

type SelectItemAction = {
  type: "select-item";
  payload: { index: number };
};

type ResetOptionSelectedAction = {
  type: "reset-option-selected";
};

type MountMenuItemAction = {
  type: "mount-menu-item";
  payload: {
    index: number;
    value: string;
    role: MenuItemRole;
  };
};

type UnmountMenuItemAction = {
  type: "unmount-menu-item";
  payload: {
    index: number;
  };
};

export type MenuAction =
  | FocusFirstItemAction
  | FocusNextItemAction
  | FocusPreviousItemAction
  | CloseMenuAction
  | ResetShouldCloseAction
  | ToggleItemCheckedAction
  | CheckRadioItemAction
  | SelectItemAction
  | ResetOptionSelectedAction
  | MountMenuItemAction
  | UnmountMenuItemAction;

export const intialMenuState: MenuState = {
  shouldClose: false,
  optionSelected: null,
  items: [],
};

export function menuReducer(state: MenuState, action: MenuAction) {
  switch (action.type) {
    case "focus-first-item":
      return produce(state, (draft) => {
        let shouldFocus = true;
        for (const item of draft.items) {
          if (shouldFocus) {
            if (item.isMounted) {
              item.isFocused = true;
              shouldFocus = false;
            } else {
              item.isFocused = false;
            }
          } else {
            item.isFocused = false;
          }
        }
      });

    case "focus-next-item":
      return produce(state, (draft) => {
        const focusedIndex = draft.items.findIndex((item) => item.isFocused);
        const nextItemIndex = (focusedIndex + 1) % draft.items.length;
        draft.items[focusedIndex].isFocused = false;
        draft.items[nextItemIndex].isFocused = true;
      });

    case "focus-previous-item":
      return produce(state, (draft) => {
        const focusedIndex = draft.items.findIndex((item) => item.isFocused);
        const previousItemIndex =
          (focusedIndex - 1 + draft.items.length) % draft.items.length;
        draft.items[focusedIndex].isFocused = false;
        draft.items[previousItemIndex].isFocused = true;
      });

    case "close-menu":
      return produce(state, (draft) => {
        draft.shouldClose = true;
      });

    case "reset-should-close":
      return produce(state, (draft) => {
        draft.shouldClose = false;
      });

    case "toggle-item-checked":
      return produce(state, (draft) => {
        if (draft.items[action.payload.index].role === "menuitemcheckbox") {
          draft.items[action.payload.index].isChecked =
            !draft.items[action.payload.index].isChecked;
        }
      });

    case "check-radio-item":
      return produce(state, (draft) => {
        if (draft.items[action.payload.index].role === "menuitemradio") {
          for (const item of draft.items) {
            item.isChecked = false;
          }
          draft.items[action.payload.index].isChecked = true;
        }
      });

    case "select-item":
      return produce(state, (draft) => {
        draft.optionSelected = draft.items[action.payload.index].value;
      });

    case "reset-option-selected":
      return produce(state, (draft) => {
        draft.optionSelected = null;
      });

    case "mount-menu-item":
      return produce(state, (draft) => {
        if (draft.items.length <= action.payload.index) {
          draft.items.push({
            isChecked: false,
            isFocused: false,
            isMounted: true,
            role: action.payload.role,
            value: action.payload.value,
          });
        } else {
          draft.items[action.payload.index].isMounted = true;
          draft.items[action.payload.index].role = action.payload.role;
        }
      });

    case "unmount-menu-item":
      return produce(state, (draft) => {
        draft.items[action.payload.index].isMounted = false;
      });

    default:
      throw new Error(`Unknown action ${(action as UnknownAction).type}`);
  }
}
