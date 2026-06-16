const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('studioApp', {
  loadData:  ()       => ipcRenderer.invoke('load-data'),
  saveData:  (data)   => ipcRenderer.invoke('save-data', data),
  dataPath:  ()       => ipcRenderer.invoke('data-path'),
  platform:  process.platform
});
