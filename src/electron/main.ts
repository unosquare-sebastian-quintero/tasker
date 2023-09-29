import { join } from "path";
import { app, BrowserWindow, ipcMain, Tray } from "electron";
import ElectronPositioner from "electron-positioner";
import { EVENT_CHANGE_ICON, EVENT_TOGGLE_PIN_WINDOW } from "./events";

// TODO: zustand
let canOpenWindow = true;

let isPinned = false;

ipcMain.on(EVENT_TOGGLE_PIN_WINDOW, () => {
  console.log('test')
  console.log("toggle pin window");
  isPinned = !isPinned;
});

function createRichContextualMenu(trayBounds: Electron.Rectangle) {
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
    if (!canOpenWindow) {
      return;
    }

    // const { x, y, width, height } = tray.getBounds();
    createRichContextualMenu(tray.getBounds());
  });
});

app.on("window-all-closed", () => {});
