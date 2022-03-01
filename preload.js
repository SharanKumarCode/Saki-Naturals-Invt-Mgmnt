const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld('electronApi', {
    fetchFirestoreData: (callBack) => {
            console.log("called preloadjs");
            //ipcRenderer.send('fetch-firestore-data');
            ipcRenderer.on('recv-firestore-data', callBack)
        },
    addProductToFirestore: (data, reduxCallBack) => {
        console.log("called preloadjs for product data update");
        ipcRenderer.send('add-product-firestore-data', data);
        ipcRenderer.on('add-product-firestore-data-to-redux', reduxCallBack)
    }
})
