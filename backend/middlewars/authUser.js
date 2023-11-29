const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//auth user
exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: "Please login to continue" });

    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);
  if (user) {
    // res.status(200).json({ message:"Uer is Authorized"})
    req.user = user;
    return next();
  } else {
    res.status(401).json({ message: "Invalid Token" });
    throw new Error();
  }
});

// auth seller
exports.isSeller = asyncHandler(async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    res.status(401).json({ message: "Please login to continue" });

    return next();
  }

  const decoded = jwt.verify(
    sellerToken,
    process.env.JWT_SECRET_KEY || "some secret"
  );

  req.seller = await Shop.findById(decoded.id);
  next();
});
