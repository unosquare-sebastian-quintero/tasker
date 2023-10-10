import { join } from "path";
import { app, BrowserWindow, Tray } from "electron";
import ElectronPositioner from "electron-positioner";
import { shallow } from "zustand/shallow";
import { taskerStore } from "../state";
import { registerIpcHandlers } from "./ipc/main";
import { taskerAction } from "./state";

function isDev() {
  return !!process.env["VITE_DEV_SERVER_URL"];
}

function createRichContextualMenuWindow(trayBounds: Electron.Rectangle) {
  const width = 480;
  const height = 320;

  const window = new BrowserWindow({
    skipTaskbar: true,
    alwaysOnTop: true,
    focusable: true,
    movable: false,
    resizable: false,
    frame: false,
    show: false,
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  window.once("ready-to-show", () => {
    const positioner = new ElectronPositioner(window);
    positioner.move("trayCenter", trayBounds);

    window.show();
    taskerAction.app.openWindow();
  });

  const unsubscribe = taskerStore.subscribe((state) => {
    if (!state.app.window.isOpen) {
      window.hide();
    }
  });

  window.addListener("close", () => {
    unsubscribe();
  });

  window.addListener("blur", () => {
    if (taskerStore.getState().app.window.isPinned) {
      return;
    }

    window.hide();
    // window.close();
    taskerAction.app.closeWindow();
  });

  if (process.env["VITE_DEV_SERVER_URL"]) {
    window.webContents.openDevTools({ mode: "detach", activate: false });
    window.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    window.loadFile(join(__dirname, "..", "dist", "index.html"));
  }

  return window;
}

app.whenReady().then(function ready() {
  if (isDev()) {
    import("electron-devtools-installer").then(
      ({ default: install, REACT_DEVELOPER_TOOLS }) => {
        install(REACT_DEVELOPER_TOOLS, {
          loadExtensionOptions: { allowFileAccess: true },
        })
          .then(console.debug)
          .catch(console.error);
      },
    );
  }

  registerIpcHandlers();

  const tray = new Tray(join(__dirname, "checklistTemplate.png"));
  let window: BrowserWindow | null = null;

  tray.setToolTip("Create task and track time");

  taskerStore.subscribe((state, prevState) => {
    if (!shallow(state.task.items, prevState.task.items)) {
      const entries = Object.entries(state.task.items);
      const statefulTasks = entries.reduce((accum, [, task]) => {
        if (task.type === "timer") {
          return accum + 1;
        }
        return accum;
      }, 0);

      if (statefulTasks === 0) {
        tray.setTitle("");
        return;
      }

      const finishedCount = entries.reduce((accum, [, task]) => {
        if (task.state === "finished") {
          return accum + 1;
        }
        return accum;
      }, 0);
      const progress = Math.floor((100 * finishedCount) / statefulTasks);
      tray.setTitle(`${progress}%`);
    }
  });

  tray.addListener("click", () => {
    if (taskerStore.getState().app.window.isOpen) {
      return;
    }

    taskerAction.app.openWindow();

    if (window != null) {
      window.show();
      return;
    }

    window = createRichContextualMenuWindow(tray.getBounds());
  });
});

app.on("window-all-closed", () => {});
