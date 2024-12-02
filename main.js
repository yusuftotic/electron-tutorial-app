const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('node:path')

require('dotenv').config();

require('update-electron-app').updateElectronApp()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./index.html')
}

app.on('ready', () => {

  ipcMain.handle('ping', () => 'pong')

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})