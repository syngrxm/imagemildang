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
const serviceAccount = require("/home/sumin/imagemildang/serviceAccountKey.json");
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
    res.status(500);
  }
}

async function dlImg(imgName) {
  try {
    const imageLive = db.collection("images").doc(imgName);
    const doc = await imageLive.get();
    if (!doc.exists) {
      return res
        .status(400)
        .json({ message: "이미지 이름이 Firestore에 존재 x" });
    }
    const file = bucket.file(imgName);
    const [fileSave] = await file.download();
    const imgData = fileSave.toString("base64");

    res.status(200).json({ message: "이미지 다운로드 성공이요 형씨", imgData });
  } catch (error) {
    res.status(500).json({ message: "이미지 다운로드 실패요 바보님" });
  }
}

module.exports = {
  ulImg,
  dlImg,
  db,
  bucket,
};
