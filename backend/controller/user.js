const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const multer=require("multer")
const upload = multer({ dest: 'uploads/' })

router.post("/create-user", upload.single('file'), async (req, res, next) => {
// router.post("/create-user", async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }
  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };
  console.log(user);
});

module.exports = router;
