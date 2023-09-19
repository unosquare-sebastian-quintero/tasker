import { join } from "path";
import { app, BrowserWindow, ipcMain, nativeImage, Tray } from "electron";
import ElectronPositioner from "electron-positioner";
import TrayIcon from "./assets/vite.svg";
import { EVENT_TOGGLE_PIN_WINDOW } from "./commands";

// TODO: zustand
var canOpenWindow = true;

function createRichContextualMenu(trayBounds: Electron.Rectangle) {
  const width = 360;
  const height = 240;
  var window = new BrowserWindow({
    alwaysOnTop: true,
    focusable: true,
    movable: false,
    resizable: false,
    frame: false,
    // transparent: true,
    // x: x - width / 2,
    // y,
    width,
    height,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  var positioner = new ElectronPositioner(window);
  positioner.move("trayCenter", trayBounds);

  var isPinned = false;
  ipcMain.on(EVENT_TOGGLE_PIN_WINDOW, (event) => {
    console.log("toggle pin window");
    isPinned = !isPinned;
  });

  window.addListener("blur", () => {
    if (isPinned) {
      return;
    }

    window.close();
    canOpenWindow = true;
  });

  if (process.env["VITE_DEV_SERVER_URL"]) {
    window.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    window.loadFile("dist/index.html");
  }

  canOpenWindow = false;
}

app.whenReady().then(function ready() {
  var tray = new Tray(nativeImage.createFromDataURL(TrayIcon));

  tray.setToolTip("Create task and track time");
  tray.setTitle("Timesheet");

  tray.addListener("click", () => {
    if (!canOpenWindow) {
      return;
    }

    // const { x, y, width, height } = tray.getBounds();
    createRichContextualMenu(tray.getBounds());
  });
});

app.on("window-all-closed", () => {});
