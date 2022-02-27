const { app, BrowserWindow, ipcMain } = require('electron');
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const path = require("path");

global.share = {ipcMain }

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 720,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    mainWindow.loadFile("index.html");
    mainWindow.maximize();

    process.env.MAIN_WINDOW_ID = mainWindow.id;

    console.log("id : " + mainWindow.id);
   
}

require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron")
})

app.whenReady().then(() => {
    // const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    // const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

    // installExtension(
    //   extensions,
    //   {loadExtensionOptions: {allowFileAccess: true}, forceDownload: false}
    // )
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err));
    createWindow();
    require('./ipc_index');
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.exit()
  })
