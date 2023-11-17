const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
// const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
// route for regitsters

router.post(
  "/create-user",
  asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Please Fill all fields" });
    }
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    //start sending email

    // const activationToken=createActivationToken(user);
    // const activationUrl=`https://localhost:3000/activate/${activationToken}`
    // try {
    //   await sendEmail({
    //     email:user.email,
    //     subject: 'Activation your account',
    //     message:`Hello ${user.name} please activate your account: ${activationUrl}`
    //   })
    //   res.status(201).json({
    //     success: true,
    //     message:`please  activate your account : ${process.env.SMPT_HOST}`
    //   })
    // } catch (err) {
    //   res.status(500).json({ message:"Invalid activation token"});
    //     next(err.message);
    // }

    const newUser = await User.create(user);
    if (newUser) {
      generateToken(res, newUser._id);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  })
);

//create activation token
// const createActivationToken = (user) => {
//   return jwt.sign(user, process.env.ACTIVATION_SECRET || "some secret", {
//     expiresIn: "5m",
//   });
// };

// route for login
router.post(
  "/login-user",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ message: "Please enter your email and password" });
    }
    const user = await User.findOne({ email });
    if (user.email === email && (await user.comparePassword(password))) {
      res.status(200).json({ message: "User was successfully connected" });
    } else {
      res.status(400).json({
        message:
          "User Not exitst in Database OR email or password was not correct ",
      });
      throw new Error();
    }
  })
);

// route for deleting all users in database
router.delete(
  "/deleteAll",
  asyncHandler(async (req, res) => {
    await User.deleteMany().then(() => {
      return res
        .status(200)
        .json({ message: "All users deleted successfully" });
    });
  })
);

module.exports = router;
