"use strict";

const express = require("express");
const router = express.Router();

router.get("/signin", (req, res)=> {
  console.log("로그인 페이지 입니다.")
  res.send("로그인 페이지 입니다.")
})


module.exports = router;