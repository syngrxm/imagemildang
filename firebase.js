// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCbqTpIYrJEKMPWlJFA4JtPsQd8t4GCTM",
  authDomain: "firstimg-f2b2d.firebaseapp.com",
  projectId: "firstimg-f2b2d",
  storageBucket: "firstimg-f2b2d.appspot.com",
  messagingSenderId: "302748673698",
  appId: "1:302748673698:web:95281f61d859f8213119fb",
  measurementId: "G-13KBVRR11Y",
};

// Initialize Firebase

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceaccount),
  storageBucket: "gs://firstimg-f2b2d.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage.bucket();
const firebase = require("./firebase");
const bucket = admin.storage().bucket();

async function ulImg(imgName, imgData) {
  try {
    await db.collection("images").add({ imageName: imgName });
    const file = bucket.file(imgName);
    await file.save(imgData, { contentType: "image/jpeg" });
  } catch (error) {
    throw error;
  }
}

module.exports = database;
