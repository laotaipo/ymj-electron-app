// 渲染进程通知

// const { app, BrowserWindow } = require('electron')
// const path = require('path')

// function createWindow () {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })

//   win.loadFile(path.resolve(__dirname, 'index.html'))
// }

// app.whenReady().then(createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })

// 主进程通知

const { app, BrowserWindow, Notification } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

   win.loadFile(path.resolve(__dirname, 'index.html'))
}

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
