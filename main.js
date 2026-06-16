const { app, BrowserWindow, ipcMain, shell } = require('electron');
app.setAppUserModelId('com.s27.studio');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(app.getPath('userData'), 'studio-data.json');
const ALLOWED_EXTERNAL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:']);

function openExternalUrl(url) {
  try {
    const parsed = new URL(url);
    if (ALLOWED_EXTERNAL_PROTOCOLS.has(parsed.protocol)) {
      shell.openExternal(url);
    }
  } catch (e) {}
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 800,
    minHeight: 600,
    title: 'S27',
    icon: path.join(__dirname, 'app', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    backgroundColor: '#F6F5F1',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: true
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
  });

  win.webContents.once('did-finish-load', () => {
    if (!win.isVisible()) win.show();
  });

  setTimeout(() => {
    if (!win.isDestroyed() && !win.isVisible()) win.show();
  }, 3000);

  // Open external links in the system browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('file://')) return;
    if (url !== win.webContents.getURL()) {
      event.preventDefault();
      openExternalUrl(url);
    }
  });
}

// IPC: load data from disk
ipcMain.handle('load-data', () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {}
  return null;
});

// IPC: save data to disk
ipcMain.handle('save-data', (event, data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data), 'utf8');
    return true;
  } catch (e) {
    return false;
  }
});

// IPC: get data file path (so user can find it)
ipcMain.handle('data-path', () => DATA_FILE);

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
