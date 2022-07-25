// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXzft4F1ZjrdnsXxd1y3r9c4PPdVSah6E",
  authDomain: "imageupload-5697d.firebaseapp.com",
  projectId: "imageupload-5697d",
  storageBucket: "imageupload-5697d.appspot.com",
  messagingSenderId: "587510409720",
  appId: "1:587510409720:web:23e2c857d64dbbd9524e0d",
  measurementId: "G-3SX7JX2Y89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
