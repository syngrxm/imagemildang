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
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://firstimg-f2b2d.appspot.com",
});

const db = admin.firestore();
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

module.exports = {
  ulImg,
  db,
  bucket,
};