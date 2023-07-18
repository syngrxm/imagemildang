const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
const { uploadImage } = require("../firebase");
// cors: Cross-Site Http Request를 가능하게 하는 표준 규칙
// 웹브라우저가 XMLHttpRequest나 Fetch API로 외부서버의 데이터에
// 접근하려는 경우, 보안 상의 이유로 브라우저는 CORS를 제한
const router = express.Router();
router.use(express.json()); // json 데이터를 express가 읽을 수 있도록
// 내장 미들웨어 설정
router.use(cors());

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads"); // 서버 파일 시스템에서 이미지 파이 ㄹ저장
  },
  filename: (req, file, cb) => {
    const name = req.body.imgName; // 요청 바디에서 이미지 이름 가져오기
    cb(null, name); // 파일 이름 설정해 주기
  },
});

const upload = multer({ storage: imgStorage }); // 파일 업로드 객체

router.post("/sendImg", upload.single("file"), async (req, res) => {
  const { imgName, imgData } = req.body;
  const dcdImg = Buffer.from(imgData, "base64"); // 디코딩
  try {
    await uploadImage(imgName, dcdImg);
    res.status(200).json({ message: "이미지 저장 성공적 " });
  } catch (error) {
    res.status(500).json({ message: "이미지 저장 실패" });
  }
});

module.exports = router;
