import { BrowserWindow, Menu, Tray, app, nativeImage } from "electron";

function createWindow() {
  var window = new BrowserWindow({ title: "Main Window" });

  if (process.env["VITE_DEV_SERVER_URL"]) {
    window.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    window.loadFile("dist/index.html");
  }
}

function createRichContextualMenu() {
  var window = new BrowserWindow({
    alwaysOnTop: true,
    focusable: true,
    movable: false,
    resizable: false,
    frame: false,
  });
}

app.whenReady().then(function ready() {
  const icon = nativeImage.createFromPath("assets/vite.svg");

  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Item1",
      type: "normal",
    },
    {
      label: "Item2",
      type: "checkbox",
    },
    {
      label: "Item3",
      type: "radio",
    },
    {
      label: "Item4",
      type: "separator",
    },
  ]);

  // contextMenu.append({ label: "Item3" });
  const bounds = tray.getBounds();
  console.log({ bounds });
  // tray.addListener("click", () => {
  //   createWindow();
  // });
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Timesheet");
  tray.setTitle("Timesheet");

  // createWindow();
});
