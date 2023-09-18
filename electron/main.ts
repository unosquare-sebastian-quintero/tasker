import { app, BrowserWindow, nativeImage, Tray } from "electron";
import TrayIcon from "./assets/vite.svg";

function createRichContextualMenu(x: number, y: number) {
  const width = 360;
  const height = 240;
  var window = new BrowserWindow({
    alwaysOnTop: true,
    focusable: true,
    movable: false,
    resizable: false,
    frame: false,
    x: x - width / 2,
    y,
    width,
    height,
  });

  window.addListener("blur", () => window.close());

  if (process.env["VITE_DEV_SERVER_URL"]) {
    window.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    window.loadFile("dist/index.html");
  }
}

app.whenReady().then(function ready() {
  var tray = new Tray(nativeImage.createFromDataURL(TrayIcon));

  tray.setToolTip("Create task and track time");
  tray.setTitle("Timesheet");

  tray.addListener("click", () => {
    const { x, y, width, height } = tray.getBounds();
    createRichContextualMenu(x + width / 2, y + height);
  });
});

app.on("window-all-closed", () => {});
