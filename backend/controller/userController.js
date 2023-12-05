const { response } = require("express");
const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("../middlewars/catchAsyncErrors");

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
  generateToken(newUser, 201, res, "token");
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
    return res
      .status(401)
      .json({ message: "Please enter your email and password" });
  }
  const user = await User.findOne({ email });
  if (user.email === email && (await user.comparePassword(password))) {
    generateToken(user, 201, res, "token");
    return res.status(200).json({ message: "User was successfully connected" });
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
  // const id = req.user.id;
  // const user = await User.findById(id);
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400).json({ message: "User not found" });
      throw new Error();
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    throw new Error();
  }
});

// logout the user
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie("sellerToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    // res.clearCookie("token");

    return res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    res.status(500).json({ message: "can't log out the user" });
    return next();
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

// update user information
const updateUserInformation = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
      throw new Error("User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res
        .status(400)
        .json({ message: "Please provide the correct information" });
      throw new Error("Please provide the correct information");
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    throw new Error(error.message);
  }
});

// update user adress
const updateUserAdress = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      res.status(400).json({ message: "address already exists" });
      throw new Error();
    }

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      // add the new address to the array
      user.addresses.push(req.body);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    throw new Error(error.message);
  }
});

// delete specific addresses
const deleteUserAddress = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );
    const user = await User.findById(userId);
    res.status(200).json({ success: true, user });
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error.message);
  }
});

// update user password

const updateUserPassword = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      res.status(400).json({ message: "Old password is incorrect!" });
      return next(new ErrorHandler("Old password is incorrect!", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      res
        .status(400)
        .json({ message: "Password doesn't matched with each other!" });
      return next(
        new ErrorHandler("Password doesn't matched with each other!", 400)
      );
    }
    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createUser,
  loginUser,
  getUsers,
  logoutUser,
  deleteAllUsers,
  updateUserInformation,
  updateUserAdress,
  deleteUserAddress,
  updateUserPassword,
};
