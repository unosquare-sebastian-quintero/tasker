import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
        onstart(options) {
          options.reload();
        },
      },
    ]),
  ],
});
