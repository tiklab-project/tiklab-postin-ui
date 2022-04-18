
// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow } = require('electron')
const path = require('path')

const reloader = require("electron-reloader");
reloader(module)

const isDev = process.env.NODE_ENV === 'local';

function createWindow () {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        frame: false,   	//让桌面应用没有边框，这样菜单栏也会消失
        width: 1240,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,

        }
    })

    // if (isDev) {
        mainWindow.loadURL(`http://127.0.0.1:3000`)
    // } else {
    //     mainWindow.loadURL(`file://${path.join(__dirname, '../build/app/index.html')}`)
    // }


    // 打开开发工具
    mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
        // 打开的窗口，那么程序会重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。