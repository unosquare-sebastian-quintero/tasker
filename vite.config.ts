import { rmSync } from "node:fs";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

rmSync("dist-electron", { recursive: true, force: true });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: "src/electron/main.ts",
        vite: {
          publicDir: "resources",
        },
      },
      {
        entry: "src/electron/preload.ts",
        onstart(options) {
          options.reload();
        },
      },
    ]),
  ],
});
