const { contextBridge, ipcRender } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRender.invoke('dark-mode:toggle'),
    system: () => ipcRender.invoke('dark-mode:system')
})