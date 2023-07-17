// 포트 연결, 라우터 불러오기

const express = require("express");
const app = express();

app.set("port", 3000);

const svImg = require("./routes/saveImg.js");
const sdImg = require("./routes/sendImg.js");

app.get("/", (req, res) => {
  res.send("이미지 교류");
});

app.use("/", svImg);
app.use("/", sdImg);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중!");
});

// firebase 관련 https://godsang.tistory.com/entry/01-%EB%82%B4%EA%B0%80-%ED%97%A4%EB%A7%A4%EC%84%9C-%EC%93%B0%EB%8A%94-Firebase-Nodejs-%EC%97%B0%EB%8F%99
const admin = require("firebase-admin");
const serviceAccount = require("/home/sumin/imagemildang/package-lock.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
