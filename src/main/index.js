const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const PORT = process.argv[2];

const loadURL = isDev ? `http://localhost:${PORT}` : path.resolve(app.getAppPath(), 'dist/index.html');
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: !isDev,
    frame: isDev,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  win.loadURL(loadURL);
  if (isDev) win.webContents.openDevTools();
}
// app.commandLine.appendSwitch('disable-site-isolation-trials');
// app.commandLine.appendSwitch('--disable-web-security');

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('show-context-menu', (event) => {
  const menu = new Menu();
  menu.append(new MenuItem({ role: 'close' }))
  menu.append(new MenuItem({
    label: 'Reload',
    accelerator: 'Ctrl+R',
    click (item, focusedWindow) {
      if (focusedWindow) focusedWindow.reload()
    }
  }))
  menu.append(new MenuItem({ 
    label: 'Clear Cache',
    click (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.webContents.session.clearCache().then(() => console.log('clear Cache !')).catch((reject) => console.error(reject));
      }
    }
  }))
  menu.append(new MenuItem({
    label: 'Toggle Developer Tools',
    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
    click (item, focusedWindow) {
      if (focusedWindow) focusedWindow.webContents.toggleDevTools()
    }
  }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ role: 'resetzoom' }))
  menu.append(new MenuItem({ role: 'zoomin' }))
  menu.append(new MenuItem({ role: 'zoomout' }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ role: 'togglefullscreen' }));
  menu.popup(BrowserWindow.fromWebContents(event.sender))
});