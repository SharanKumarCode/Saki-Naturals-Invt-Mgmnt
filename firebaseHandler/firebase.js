const { initializeApp } = require('firebase/app');

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

module.exports = {
  firebaseApp
}