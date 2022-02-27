const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld('electronApi', {
    fetchFirestoreData: (callback) => {
            console.log("called preloadjs");
            ipcRenderer.send('fetch-firestore-data');
            ipcRenderer.on('recv-firestore-data', callback)
        }
})
