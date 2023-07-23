const express = require("express");
const router = express.Router();
const { dlImg } = require("../firebase");

router.post("/saveImg", async (req, res) => {
  const { imgName } = req.body;

  try {
    const imgData = await dlImg(imgName, res);
    res.status(200).json({ message: "이미지 리턴 성공이요 형씨", imgData });
  } catch (error) {
    res.status(500).json({ message: "이미지 리턴 실패임 밥통아" });
  }
});
module.exports = router;