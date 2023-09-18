import { BrowserWindow, Tray, app, nativeImage } from "electron";

function createRichContextualMenu(x: number, y: number) {
  const width = 640;
  var window = new BrowserWindow({
    alwaysOnTop: true,
    focusable: true,
    movable: false,
    resizable: false,
    frame: false,
    x: x - width / 2,
    y,
    width,
  });

  window.addListener("blur", () => window.close());

  if (process.env["VITE_DEV_SERVER_URL"]) {
    window.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    window.loadFile("dist/index.html");
  }
}

app.whenReady().then(function ready() {
  const icon = nativeImage.createFromPath("assets/vite.svg");

  var tray = new Tray(icon);

  tray.setToolTip("Create task and track time");
  tray.setTitle("Timesheet");

  tray.addListener("click", () => {
    const { x, y, width, height } = tray.getBounds();
    createRichContextualMenu(x + width / 2, y + height);
  });
});

app.on("window-all-closed", () => {});
