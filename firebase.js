require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase

const admin = require("firebase-admin");
const serviceAccount = require("./firstimg-f2b2d-firebase-adminsdk-far95-deecf8176f.json");
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
    const contentType = imgData.includes("png") ? "image/png" : "image/jpeg";
    await file.save(imgData, { contentType: contentType });
  } catch (error) {
    throw error;
  }
}
async function dlImg(imgName, res) {
  try {
    const imageLive = db.collection("images").doc(imgName);
    const doc = await imageLive.get();
    if (!doc.exists) {
      throw new Error("이미지 이름 firestore에 존재 x");
    } else {
      const file = bucket.file(imgName);
      const [fileSave] = await file.download();
      const imgData = fileSave.toString("base64");
      return imgData;
    }
  } catch (error) {
    if (res) {
      res.status(400);
    } else {
      throw error;
    }
  }
}

module.exports = {
  ulImg,
  dlImg,
  db,
  bucket,
};