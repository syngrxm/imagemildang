const express = require("express");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");
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

router.post("/sendImg", upload.single("file"), (req, res) => {
  const { imgName, imgData } = req.body;
  const dcdImg = Buffer.from(imgData, "base64"); // 디코딩

  fs.writeFile(imgName, dcdImg, (err) => {
    // fs.writeFile: 이미지 파일 ㅅ버에 저장
    if (err) {
      console.error(err);
      res.status(500).json({ error: "이미지를 저장하는 데에 실패했습니다. " });
    } else res.json({ message: "이미지 저장이 성공적으로 완료되었습니다!" });
  });
});

module.exports = router;
