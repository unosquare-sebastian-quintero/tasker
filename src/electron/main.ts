import { join } from "path";
import { app, BrowserWindow, ipcMain, Tray } from "electron";
import ElectronPositioner from "electron-positioner";
import { EVENT_CHANGE_ICON, EVENT_WINDOW_LOAD } from "./events";
import { registerIpcHandlers } from "./ipc";
import { state, toShared } from "./state";

function createRichContextualMenuWindow(trayBounds: Electron.Rectangle) {
  const width = 360;
  const height = 240;
  const window = new BrowserWindow({
    alwaysOnTop: true,
    focusable: true,
    movable: false,
    resizable: false,
    frame: false,
    show: false,
    width,
    height,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  window.once("ready-to-show", () => {
    const positioner = new ElectronPositioner(window);
    positioner.move("trayCenter", trayBounds);

    window.show();
    state.app.setWindowOpen(true);
  });

  window.addListener("blur", () => {
    if (state.app.windowPinned) {
      return;
    }

    window.close();
    state.app.setWindowOpen(false);
  });

  let loadWindow;
  if (process.env["VITE_DEV_SERVER_URL"]) {
    window.webContents.openDevTools({ mode: "detach", activate: false });
    loadWindow = window.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    loadWindow = window.loadFile("dist/index.html");
  }
  loadWindow.then(() => {
    console.log("webContents");
    window.webContents.send(EVENT_WINDOW_LOAD, toShared(state));
  });

  return window;
}

app.whenReady().then(function ready() {
  registerIpcHandlers();

  let iconIndex = 0;
  const iconList = [
    join(__dirname, "checklistTemplate.png"),
    join(__dirname, "clockTemplate.png"),
  ];

  const tray = new Tray(iconList[iconIndex]);

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
    if (state.app.windowOpen) {
      return;
    }

    // const { x, y, width, height } = tray.getBounds();
    createRichContextualMenuWindow(tray.getBounds());
  });
});

app.on("window-all-closed", () => {});
