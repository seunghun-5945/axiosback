"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true } // nickname 필드 추가
});

const User = mongoose.model("User", userSchema);

module.exports = User;
