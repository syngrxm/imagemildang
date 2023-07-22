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
const serviceAccount = {
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key_id": process.env.private_key_id,
  "private_key": process.env.private_key,
  "client_email": process.env.lient_email,
  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.client_x509_cert_url,
  "universe_domain": process.env.universe_domain
};

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
