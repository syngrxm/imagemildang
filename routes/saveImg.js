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
    /*
    writeStream.write(imgData, "base64");
    writeStream.end();
    */
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(400).json({ messeage: "존재하지 않는 이미지입니다." });
    }
  }
});

module.exports = router;
