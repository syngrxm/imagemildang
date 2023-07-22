// 포트 연결, 라우터 불러오기
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 3000);
app.use(bodyParser.json());

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

const firebase = require("./firebase");