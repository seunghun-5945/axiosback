"use strict";

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const mongodb = require("../config/mongodb");
const User = require("../models/User")

mongoose.connect(mongodb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("DB연결 성공"))
.catch((error)=> console.log("DB연결 실패", error))

router.post("/signup", async (req, res)=> {
  const { nickname, username, password } = req.body;

  try {
    const newUser = new User({
      nickname,
      username,
      password,
    });

    await newUser.save();
    console.log("회원가입 성공");
  }
  catch(error) {
    console.log(error);
  }
})

module.exports = router;