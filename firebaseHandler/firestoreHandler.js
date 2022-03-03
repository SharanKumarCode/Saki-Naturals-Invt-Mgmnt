const { BrowserWindow } = require('electron');
const {firebaseApp}  = require('./firebase');
const { getFirestore, collection, getDoc, getDocs, doc, setDoc, serverTimestamp } = require('firebase/firestore/lite');

const getMainWindow = () => {
    const ID = process.env.MAIN_WINDOW_ID * 1;
    return BrowserWindow.fromId(ID)
  }

const currMainWindow = getMainWindow();

const db = getFirestore(firebaseApp);

const getProducts = async () => {
    console.log("getting data from firestore");
    const productsCol = collection(db, 'Products');
    const productsSnapshot = await getDocs(productsCol);
    const productsList = productsSnapshot.docs.map(doc => doc.data());
    return productsList;
}

const addProductsToFirestore = async (data) => {
    console.log("adding product to firestore")
    await setDoc(doc(db, "Products", data.productID.toString()), {
        ...data,
        timestamp: serverTimestamp()
    }).then(d=>{
        console.log(d)
        return d;
    }).catch(err=>{
        console.log(err)
    })
}

module.exports = {
 products: global.share.ipcMain.on('fetch-firestore-data', (event, arg) => {
    console.log("mainjs called")
    getProducts().then(data=>{
        currMainWindow.webContents.send('recv-firestore-data', data);
        console.log("data fetched");
    }).catch(err=>{
        console.log(err)
    })
}),
    productsAdd: global.share.ipcMain.on('add-product-firestore-data', (event, arg) => {
    console.log("mainjs called for product data update")
    console.log(arg);
    addProductsToFirestore(arg).then(d=>{
        console.log("succees : " + d)
        console.log("sending data")
        console.log(arg);
        currMainWindow.webContents.send('add-product-firestore-data-to-redux', arg);
    }).catch(err=>{
        console.log(err)
    });    
}),

}