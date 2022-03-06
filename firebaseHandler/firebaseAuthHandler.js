const { BrowserWindow } = require('electron');
const { firebaseApp } = require("./firebase");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signOut  } =require( "firebase/auth");

const getMainWindow = () => {
    const ID = process.env.MAIN_WINDOW_ID * 1;
    return BrowserWindow.fromId(ID)
  }

const currMainWindow = getMainWindow();

const auth = getAuth(firebaseApp);

const firebaseAuthSignUp = (email, password, name)=>{
    let errorData = {
        type: "error",
        message: null
    };
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(()=>{
                const userData = {
                    id: user.uid,
                    email: user.email,
                    name: user.displayName
                }
                currMainWindow.webContents.send('recv-firebase-auth-signup', userData);
            }).catch(error=>{
                console.log("display name error")
                console.log(error.code, error.message);
                
                if(error.code === "auth/invalid-display-name"){
                    errorData = {
                        type: "name",
                        message: "Name is Invalid"
                    }            
                } else {
                    errorData = {
                        type: "all",
                        message: "Something went worng. Please try again later"
                    }
                }

                currMainWindow.webContents.send('recv-firebase-auth-signup', errorData);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error : ")
            console.log(errorCode, errorMessage);
    
            if(error.code === "auth/email-already-exists"){
                errorData = {
                    type: "email",
                    message: "Account already exist with the given email address"
                }            
            } else if(error.code === "auth/invalid-email"){
                errorData = {
                    type: "email",
                    message: "Invalid Email address"
                }
            } else if(error.code === "auth/invalid-password"){
                errorData = {
                    type: "password",
                    message: "Invalid Password"
                }
            } else {
                errorData = {
                    type: "all",
                    message: "Something went worng. Please try again later"
                }
            }
            
            currMainWindow.webContents.send('recv-firebase-auth-signup', errorData);
        });
        
}

const firebaseAuthSignIn = (email, password)=>{
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log("User Signed In : ")
        console.log(user.email);
        const userData = {
            id: user.uid,
            email: user.email,
            name: user.displayName
        }
            currMainWindow.webContents.send('recv-firebase-auth-signin', userData);
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error : ")
        console.log(error.code, error.message);
        
        let errorData = {
            type: "error",
            message: null
        };

        if(error.code === "auth/user-not-found"){
            errorData = {
                type: "email",
                message: "Account does not exist with the given email address"
            }            
        } else if(error.code === "auth/invalid-email"){
            errorData = {
                type: "email",
                message: "Invalid Email address"
            }
        } else if(error.code === "auth/wrong-password"){
            errorData = {
                type: "password",
                message: "Wrong Password"
            }
        } else {
            errorData = {
                type: "both",
                message: "Something went worng. Please try again later"
            }
        }

        currMainWindow.webContents.send('recv-firebase-auth-signin', errorData);
        });
        
}

const signOutUser = ()=>{
    signOut(auth).then(() => {
        console.log("User is signed out successfully");
        currMainWindow.webContents.send('recv-firebase-auth-signout', "success");
      }).catch((error) => {
        console.log(error);
        currMainWindow.webContents.send('recv-firebase-auth-signout', "error");
      });
}

const getCurrentUser = ()=>{

    const userData = {
        id: null,
        name: null,
        email: null
    }

    if(auth.currentUser){
        userData = {
            id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            email: auth.currentUser.email
        }
    }    

    return new Promise((resolve, reject)=>{
        resolve(userData);     
    }) 
}

const forgotPassword = (email)=>{
    sendPasswordResetEmail(auth, email)
    .then(()=>{
        console.log("Password Reset email sent");
        currMainWindow.webContents.send('recv-firebase-auth-forgot-pwd', "No error");
    })
    .catch(error=>{
        console.log(error);
        if (error.code === "auth/invalid-email"){
            currMainWindow.webContents.send('recv-firebase-auth-forgot-pwd', "Invalid email");
        } else {
            currMainWindow.webContents.send('recv-firebase-auth-forgot-pwd', "Error");
        }
        
    })
}

module.exports = {
     firebaseAuthGetCurrentUser: global.share.ipcMain.on('firebase-auth-current-user', (event, arg)=>{
        getCurrentUser().then(data=>{
            currMainWindow.webContents.send('recv-firebase-auth-current-user', data);
        })        
    }),
    firebaseSignUp: global.share.ipcMain.on('firebase-auth-signup', (event, email, password, name)=>{
        console.log(email, password, name)
        firebaseAuthSignUp(email, password, name)
    }),
    firebaseSignIn: global.share.ipcMain.on('firebase-auth-signin', (event, email, password)=>{
        console.log(email, password)
        firebaseAuthSignIn(email, password)
    }),
    firebaseAuthSignOut: global.share.ipcMain.on('firebase-auth-signout', (event, args)=>{
        signOutUser();
    }),
    firebaseAuthForgPwd: global.share.ipcMain.on('firebase-auth-forgot-pwd', (event, email)=>{
        console.log(email)
        forgotPassword(email)
    }),
}