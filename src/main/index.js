import { app, BrowserWindow } from 'electron'


const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (!isDevelopment) {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被垃圾回收的时候，window对象将会自动的关闭
let mainWindow
const winURL = isDevelopment ? `http://localhost:9080`: `file://${__dirname}/index.html`

function createWindow () {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载首页html文件
  mainWindow.loadURL(winURL)

  // 开发环境下打开开发者工具
  if(isDevelopment){
    mainWindow.webContents.openDevTools()
  }

  // 移除菜单
  mainWindow.removeMenu();

  // 当 window 被关闭，这个事件会被触发。
  mainWindow.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，通常会把多个 window 对象存放在一个数组里面，与此同时，你应该删除相应的元素。
    mainWindow = null
  })
}


// Electron 会在初始化后并准备，创建浏览器窗口时，调用这个函数。部分 API 在 ready 事件触发后才能使用
app.on('ready', createWindow)

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，通常在应用程序中重新创建一个窗口。
  if (mainWindow === null) {
    createWindow()
  }
})

// 在这个文件中，你可以续写应用剩下主进程代码。也可以拆分成几个文件，然后用 require 导入。

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
