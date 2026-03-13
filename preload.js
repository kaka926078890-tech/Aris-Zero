const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aris', {
  setIgnoreMouseEvents: (ignore, options) =>
    ipcRenderer.send('set-ignore-mouse-events', ignore, options),
  sendMessage: (text) => ipcRenderer.invoke('dialogue:send', text),
  abortDialogue: () => ipcRenderer.invoke('dialogue:abort'),
  onDialogueChunk: (callback) => {
    const handler = (_, chunk) => callback(chunk);
    ipcRenderer.on('dialogue:chunk', handler);
    return () => ipcRenderer.removeListener('dialogue:chunk', handler);
  },
  onAgentActions: (callback) => {
    const handler = (_, actions) => callback(actions);
    ipcRenderer.on('dialogue:agentActions', handler);
    return () => ipcRenderer.removeListener('dialogue:agentActions', handler);
  },
  getWindowTitle: () => ipcRenderer.invoke('get-window-title'),
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  closeWindow: () => ipcRenderer.invoke('window:close'),
  onProactive: (callback) => {
    ipcRenderer.on('aris:proactive', (_, msg) => callback(msg));
  },
  openHistory: () => ipcRenderer.send('app:openHistory'),
  openMemory: () => ipcRenderer.send('app:openMemory'),
  openConfig: () => ipcRenderer.send('app:openConfig'),
  openPrompt: () => ipcRenderer.send('app:openPrompt'),
  exportMemory: () => ipcRenderer.send('app:exportMemory'),
  importMemory: () => ipcRenderer.send('app:importMemory'),
});
