/*
 * @Descripttion: 
 * @Author: candice
 * @Date: 2020-08-03 19:31:07
 * @LastEditors: candice
 * @LastEditTime: 2020-08-07 11:11:43
 */
const { app, BrowserWindow, dialog } = require("electron")
const isDev = require("electron-is-dev")
const { autoUpdater } = require("electron-updater")
let mainWindow;
app.on("ready", () => {
  autoUpdater.autoDownload = false
  autoUpdater.checkForUpdates()
  //当更新发生错误的时候触发。
  autoUpdater.on('error', (err) => {
    dialog.showErrorBox("Error", err === null ? "unknown" : err)
  })
  //当开始检查更新的时候触发。

  autoUpdater.on('update-avaliable', () => {
    dialog.showMessageBox({
      type: "info",
      title: "应用有新的版本",
      message: "发现新版本，是否现在更新？",
      buttons: ["是", "否"],

    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate()
      }
    })
  })
  // 当开始检查更新的时候触发
  autoUpdater.on('checking-for-update', function () {
    console.log("checking-for-update")
  })
  // 当发现有可用更新的时候触发，更新包下载会自动开始
  autoUpdater.on('update-available', (info) => {
    console.log(info)
  })
  // 当发现版本为最新版本触发
  autoUpdater.on('update-not-available', (info) => {
    console.log(info)
  })
  // 更新下载进度事件
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(progressObj)
  })
  // 包下载成功时触发
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
    // 收到renderer进程确认更新
    ipcMain.on('updateNow', (e, arg) => {
      console.log('开始更新')
      autoUpdater.quitAndInstall() // 包下载完成后，重启当前的应用并且安装更新
    })
  })


  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  const urlLocation = isDev ? "http://localhost:8000/index.html" : `file://${__dirname}/index.html`
  mainWindow.loadURL(urlLocation)
})
//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
