const express = require("express");
const router = express.Router();
const { dlImg } = require("../firebase");

router.post("/saveImg", async (req, res) => {
  const { imgName } = req.body;

  try {
    const imgData = await dlImg(imgName);
    if (imgData === null) {
      res.status(404).json({ message: "이미지가 존재하지 않습니다." });
    } else {
      res.status(200).json({ message: "이미지 리턴 성공이요 형씨", imgData });
    }
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
