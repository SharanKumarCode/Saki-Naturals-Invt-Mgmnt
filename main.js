const { app, BrowserWindow, ipcMain } = require('electron');
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const path = require("path");
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc} = require('firebase/firestore/lite');

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
}

const firebaseConfig = {
  apiKey: "AIzaSyCaBxvK6T5KZLq35o_LFZhcQ99X0sXRYeY",
  authDomain: "inventory-management-762a0.firebaseapp.com",
  projectId: "inventory-management-762a0",
  storageBucket: "inventory-management-762a0.appspot.com",
  messagingSenderId: "505730721101",
  appId: "1:505730721101:web:089e0a5c19b44e4c314304",
  measurementId: "G-0TXS9W6B50"
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const getCities = async () => {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);
    return cityList;
}

ipcMain.on('fetch-firestore-data', (event, arg) => {
    console.log("mainjs called")
    getCities().then(data=>{
        mainWindow.webContents.send('recv-firestore-data', data[0].city_name);
        console.log(data);
    }).catch(err=>{
        console.log(err)
    })
})

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
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.exit()
  })
