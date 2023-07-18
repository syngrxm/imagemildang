const express = require("express");
const router = express.Router();
const multer = require("multer");
const { ulImg } = require("../firebase");

const imgStorage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    const name = req.body.imgName;
    cb(null, name);
  },
});

const upload = multer({ storage: imgStorage }).none();
router.post("/sendImg", upload, async (req, res) => {
  const { imgName, imgData } = req.body;

  if (!imgData) {
    return res.status(400).json({ message: "이미지 존재 X" });
  }

  try {
    const dcdImg = Buffer.from(imgData, "base64");
    await ulImg(imgName, dcdImg);
    res.status(200).json({ message: "이미지 저장 성공" });
  } catch (error) {
    res.status(500).json({ message: "이미지 저장 실패" });
  }
});

module.exports = router;
