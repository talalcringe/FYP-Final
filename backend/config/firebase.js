// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCixKbfO-qYomz0ia4Xxd33Fgu8Ilj4lxI",
  authDomain: "sprinting-poc.firebaseapp.com",
  projectId: "sprinting-poc",
  storageBucket: "sprinting-poc.appspot.com",
  messagingSenderId: "125483057694",
  appId: "1:125483057694:web:9e11f464febe25465fa40f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;
