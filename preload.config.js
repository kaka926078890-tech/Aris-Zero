const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('configApi', {
  readPersona: () => ipcRenderer.invoke('config:readPersona'),
  readRules: () => ipcRenderer.invoke('config:readRules'),
  writePersona: (content) => ipcRenderer.invoke('config:writePersona', content),
  writeRules: (content) => ipcRenderer.invoke('config:writeRules', content),
});
