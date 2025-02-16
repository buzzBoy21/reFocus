import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
// Custom APIs for renderer
const api = {
   //To call this function you have to use window.api.readFileCustom
   //I prefer call readFileCustom because just exist readFile in Node.js
   readFileCustom: (filePath) => ipcRenderer.invoke('read-file', filePath),

   //To call this -> use window.api.writeFileCustom
   writeFileCustom: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
   isFullscreen: () => ipcRenderer.invoke('fullScreenChecking'),
   executeCommand: (developerCommand, productionCommand) =>
      ipcRenderer.invoke('execute-command', developerCommand, productionCommand),
   getAbsolutePath: () => ipcRenderer.invoke('absolute-path'),
   services: {
      getShutDownServer: () => ipcRenderer.invoke('shutdown-server'),
      getAllWindowNames: () => ipcRenderer.invoke('get-windows-names'),
      getAllHotKeys: () => ipcRenderer.invoke('get-hot-keys'),
      postCreateHotKey: (contextValue) => ipcRenderer.invoke('post-create-hot-key', contextValue),
      deleteHotKey: (hotKey) => ipcRenderer.invoke('delete-hot-key', hotKey),
      serverIsRunning: () => ipcRenderer.invoke('health'),
   },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
   try {
      contextBridge.exposeInMainWorld('electron', electronAPI);
      contextBridge.exposeInMainWorld('api', api);
      console.log('antes de render', api);
   } catch (error) {
      console.error(error);
   }
} else {
   window.electron = electronAPI;
   window.api = api;
}
