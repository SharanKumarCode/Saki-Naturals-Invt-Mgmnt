const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld('electronApi', {
    fetchFirestoreData: (callBack) => {
            //ipcRenderer.send('fetch-firestore-data');
            ipcRenderer.on('recv-firestore-data', callBack)
        },
    addProductToFirestore: (data, reduxCallBack) => {
        ipcRenderer.send('add-product-firestore-data', data);
        ipcRenderer.on('add-product-firestore-data-to-redux', reduxCallBack);
    },
    firebaseAuthGetCurrentUser: (reduxCallBack)=>{
        console.log("checking user - preloadjs")
        ipcRenderer.send('firebase-auth-current-user');
        ipcRenderer.on('recv-firebase-auth-current-user', reduxCallBack);
    },
    firebaseAuthSigUp: (email, password, name, reduxCallBack)=>{
        ipcRenderer.send('firebase-auth-signup', email, password, name);
        ipcRenderer.on('recv-firebase-auth-signup', reduxCallBack);
    },
    firebaseAuthSigIn: (email, password, reduxCallBack)=>{
        ipcRenderer.send('firebase-auth-signin', email, password);
        ipcRenderer.on('recv-firebase-auth-signin', reduxCallBack);
    },
    firebaseAuthSignOut: (callback)=>{
        ipcRenderer.send('firebase-auth-signout');
        ipcRenderer.on('recv-firebase-auth-signout', callback);
    },
    firebaseAuthForgPwd: (email, callback)=>{
        ipcRenderer.send('firebase-auth-forgot-pwd', email);
        ipcRenderer.on('recv-firebase-auth-forgot-pwd', callback);
    }
})
