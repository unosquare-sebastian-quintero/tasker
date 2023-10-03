import { registerAppHandlers } from "./app/handlers";
import { registerStateHandlers } from "./state/handlers";
import { registerTaskHandlers } from "./task/handlers";

export function registerIpcHandlers() {
  registerAppHandlers();
  registerStateHandlers();
  registerTaskHandlers();
}
