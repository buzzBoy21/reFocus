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
