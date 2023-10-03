import { registerAppHandlers } from "./app/handlers";
import { registerTaskHandlers } from "./task/handlers";

export function registerIpcHandlers() {
  registerAppHandlers();
  registerTaskHandlers();
}
