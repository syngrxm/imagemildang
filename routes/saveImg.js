const express = require("express");
const fs = require("fs");
const router = express.Router();
const { dlImg } = require("../firebase");

router.post("/saveImg", async (req, res) => {
  const { imgName } = req.body;

  try {
    const imgData = await dlImg(imgName);
    res.status(200).json({ message: "이미지 다운로드 성공이요 형씨", imgData });
  } catch (error) {
    res.status(500).json({ message: "이미지 다운로드 실패임 밥통아" });
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
