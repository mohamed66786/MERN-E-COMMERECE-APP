const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

// register user
const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "Please Fill all fields" });
  }
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return res.status(400).json({ message: "User already exist" });
  }

  //start sending email for activation

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

  // add user to database
  const user = {
    name: name,
    email: email,
    password: password,
  };
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
});

// login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({ message: "Please enter your email and password" });
  }
  const user = await User.findOne({ email });
  if (user.email === email && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({ message: "User was successfully connected" });
  } else {
    res.status(400).json({
      message:
        "User Not exitst in Database OR email or password was not correct ",
    });
    throw new Error();
  }
});

//get user
const getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find(req.user.id);
  try {
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Not authorized" });
    throw new Error();
  }
});

// delete all users
const deleteAllUsers = asyncHandler(async (req, res) => {
  await User.deleteMany().then(() => {
    return res.status(200).json({ message: "All users deleted successfully" });
  });
});

module.exports = { createUser, loginUser, getUsers, deleteAllUsers };
