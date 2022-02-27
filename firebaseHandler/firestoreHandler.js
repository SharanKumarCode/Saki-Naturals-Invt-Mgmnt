const { BrowserWindow } = require('electron');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc} = require('firebase/firestore/lite');

const getMainWindow = () => {
    const ID = process.env.MAIN_WINDOW_ID * 1;
    return BrowserWindow.fromId(ID)
  }

const currMainWindow = getMainWindow();

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

const getProducts = async () => {
    console.log("called async");
    const productsCol = collection(db, 'Products');
    const productsSnapshot = await getDocs(productsCol);
    const productsList = productsSnapshot.docs.map(doc => doc.data());
    return productsList;
}

module.exports = {
 products: global.share.ipcMain.on('fetch-firestore-data', (event, arg) => {
    console.log("mainjs. mainjs called")
    getProducts().then(data=>{
        currMainWindow.webContents.send('recv-firestore-data', data);
        console.log("data fetched");
    }).catch(err=>{
        console.log(err)
    })
})
}