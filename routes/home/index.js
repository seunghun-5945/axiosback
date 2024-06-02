"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res)=> {
  console.log("홈 입니다.")
  res.send("홈 입니다.")
})

module.exports = router;