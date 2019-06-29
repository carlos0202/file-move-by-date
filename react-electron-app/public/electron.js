const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let appWindow = null;

function createAppWindow() {
  // Initialize the window to our specified dimensions
  appWindow = new BrowserWindow({ width: 1024, height: 768 });
  // Specify entry point
  appWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    appWindow.webContents.openDevTools();
  }
  // Remove window once app is closed
  appWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createAppWindow);

app.on('activate', () => {
  if (appWindow === null) {
    createAppWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});