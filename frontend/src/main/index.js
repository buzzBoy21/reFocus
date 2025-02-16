import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/reFocus_icon.ico?asset';
import readFile from './../fileOutInput/readFile';
import writeFile from '../fileOutInput/writeFile';
import getAllWindowNames from '../services/getAllWindowNames';
import postCreateHotKey from '../services/createHotKey';
import getAllHotKeys from '../services/getAllHotKeys';
import deleteHotKey from '../services/deleteHotKey';
import getServerIsRunning from '../services/getServerIsRunning';
import executeCommand from '../utils/executeCommand';
import getShutDownServer from '../services/getShutDownServer';

function createWindow() {
   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 900,
      minWidth: 400,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      icon: icon,
      title: 'reFocus app',
      titleBarStyle: 'hiddenInset',
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
         preload: join(__dirname, '../preload/index.js'),
         sandbox: false,
      },
   });

   mainWindow.on('ready-to-show', () => {
      mainWindow.show();
   });

   mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: 'deny' };
   });

   // HMR for renderer base on electron-vite cli.
   // Load the remote URL for development or the local html file for production.
   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
   } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
   }

   if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools({ mode: 'right' });
   }
   ipcMain.handle('fullScreenChecking', async (event) => {
      if (mainWindow) {
         return mainWindow.isFullScreen();
      }
   });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   // Set app user model id for windows
   electronApp.setAppUserModelId('com.electron');

   // Default open or close DevTools by F12 in development
   // and ignore CommandOrControl + R in production.
   // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
   app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window);
   });

   //Allow front can access to readFile function: red-file is referencing to value on api object in src/main/index.js
   ipcMain.handle('read-file', async (event, filePath) => {
      try {
         const content = await readFile(filePath);
         return content;
      } catch (error) {
         console.error(error);
      }
   });
   //Allow front can access to writeFile function: write-file is referencing to value on api object in src/main/index.js
   ipcMain.handle('write-file', async (event, filePath, contentToWrite) => {
      try {
         const content = await writeFile(filePath, contentToWrite);
         return content;
      } catch (error) {
         console.error(error);
      }
   });
   ipcMain.handle('execute-command', async (event, developCommand, productionCommand) => {
      return await executeCommand(developCommand, productionCommand);
   });
   ipcMain.handle('absolute-path', async (event) => {
      return process.cwd();
   });
   ipcMain.handle('get-windows-names', async (event) => {
      try {
         return await getAllWindowNames();
      } catch (error) {
         console.error('Error fetching window names:', error);
         throw error;
      }
   });
   ipcMain.handle('post-create-hot-key', async (event, contextValue) => {
      try {
         return await postCreateHotKey(contextValue);
      } catch (error) {
         console.error('Error fetching window names:', error);
         throw error;
      }
   });

   ipcMain.handle('get-hot-keys', async (event) => {
      try {
         return await getAllHotKeys();
      } catch (error) {
         console.error('Error fetching window names:', error);
         throw error;
      }
   });
   ipcMain.handle('delete-hot-key', async (event, hotKeyJSON) => {
      try {
         return await deleteHotKey(hotKeyJSON);
      } catch (error) {
         console.error('Error fetching window names:', error);
         throw error;
      }
   });
   ipcMain.handle('health', async (event) => {
      try {
         return await getServerIsRunning();
      } catch (error) {
         console.error('Error fetching window names:', error);
         throw error;
      }
   });
   ipcMain.handle('shutdown-server', async (event) => {
      return await getShutDownServer();
   });

   createWindow();

   app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
