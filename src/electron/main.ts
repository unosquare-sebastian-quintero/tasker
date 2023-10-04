import { join } from "path";
import { app, BrowserWindow, ipcMain, Tray } from "electron";
import ElectronPositioner from "electron-positioner";
import { taskerStore } from "../state";
import { EVENT_CHANGE_ICON } from "./events";
import { registerIpcHandlers } from "./ipc";
import { taskerAction } from "./state";

function isDev() {
  return !!process.env["VITE_DEV_SERVER_URL"];
}

function createRichContextualMenuWindow(trayBounds: Electron.Rectangle) {
  // const width = 360;
  // const height = 240;

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

  let iconIndex = 0;
  const iconList = [
    join(__dirname, "checklistTemplate.png"),
    join(__dirname, "clockTemplate.png"),
  ];

  const tray = new Tray(iconList[iconIndex]);
  let window: BrowserWindow | null = null;

  tray.setToolTip("Create task and track time");
  // tray.setTitle("Timesheet");
  // setTimeout(() => {
  //   tray.setTitle("80%");
  // }, 1000);
  // setTimeout(() => {
  //   tray.setTitle("90%");
  // }, 2000);

  ipcMain.on(EVENT_CHANGE_ICON, () => {
    iconIndex = (iconIndex + 1) % iconList.length;
    tray.setImage(iconList[iconIndex]);
  });

  tray.addListener("click", () => {
    if (taskerStore.getState().app.window.isOpen) {
      return;
    }

    if (window != null) {
      window.show();
      return;
    }

    window = createRichContextualMenuWindow(tray.getBounds());
  });
});

app.on("window-all-closed", () => {});
