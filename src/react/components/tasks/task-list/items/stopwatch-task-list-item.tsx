import { MenuItem } from "../../../common/menu-item/menu-item";
import { Menu } from "../../../common/menu/menu";
import {
  StandardTaskListItem,
  StandardTaskListItemProps,
} from "./standard-task-list-item";

export type StopwatchTaskListItemProps = StandardTaskListItemProps;

export function StopwatchTaskListItem({
  ...props
}: StopwatchTaskListItemProps) {
  return (
    <StandardTaskListItem
      {...props}
      menu={
        <Menu onOptionSelected={console.log}>
          <MenuItem variant="default" value="option-1">
            Option 1
          </MenuItem>
        </Menu>
      }
    />
  );
}
