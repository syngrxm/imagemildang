const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.use(express.json());

router.post("/saveImg", async (req, res) => {
  const { imgName } = req.body;
  try {
    const imgimg = db.collection("images").doc(imgName);
    const doc = await imgimg.get();
    if (!doc.exists) {
      res.status(500).json({ message: "이미지를 찾을 수 없음 " });
    }
    const imgPath = path.resolve(__dirname, "../uploads", imgName);
    const file = bucket.flie(imgName);
    const fileReadStream = file.createReadStream();
    const writeStream = fs.createWriteStream(imgPath);
    fileReadStream.on("finish", () => {
      res.sendFile(imgPath);
    });
  } catch (error) {
    // 여기서 에러나면 뭔에러지
  }
});
module.exports = router;

/*
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.use(express.json());

router.post("/saveImg", (req, res) => {
  const { imgName } = req.body;

  const imgPath = path.resolve(__dirname, "../uploads", imgName);
  // 이미지 파일 경로

  try {
    fs.statSync(imgPath); // 존재?
    res.json({ message: "이미지가 존재합니다. 저장을 시작합니다." });
    const writeStream = fs.createWriteStream(imgPath);
    req.pipe(writeStream);

  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(400).json({ messeage: "존재하지 않는 이미지입니다." });
    }
  }
});

module.exports = router;

*/
