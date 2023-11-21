const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewars/catchAsyncErrors");

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
  // add user to database
  const user = {
    name: name,
    email: email,
    password: password,
  };
  await User.create(user);
  const newUser = await User.findOne({ email: user.email });
  generateToken(newUser, 201, res);
  return res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
});

// login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({ message: "Please enter your email and password" });
  }
  const user = await User.findOne({ email });
  if (user.email === email && (await user.comparePassword(password))) {
    generateToken(user, 201, res);
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
const getUsers = catchAsyncErrors(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    return next(new ErrorHandler(error.message, 500));
  }
});

// logout the user
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    // res.clearCookie("token");

    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    res.status(500).json({ message: "can't log out the user" });
    return next(new ErrorHandler(error.message, 500));
  }
});

// delete all users
const deleteAllUsers = asyncHandler(async (req, res) => {
  await User.deleteMany()
    .then(() => {
      return res
        .status(200)
        .json({ message: "All users deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error" });
      throw new Error();
    });
});

module.exports = {
  createUser,
  loginUser,
  getUsers,
  deleteAllUsers,
  logoutUser,
};
