const { BrowserWindow, Tray, app } = require('electron')
app.whenReady().then(() => {
    const win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
    const appIcon = new Tray('/Users/yangmingjing/Downloads/Rectangle 18.png')
    console.log(appIcon, win)
})


// const { clipboard, Tray } = require('electron')
// const image = clipboard.readImage()
// const appIcon = new Tray(image)
// console.log(appIcon)