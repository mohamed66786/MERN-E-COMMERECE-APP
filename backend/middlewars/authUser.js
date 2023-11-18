const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.token;
  if (token) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "some secret"
    );
    const id = decoded._id;
    const user = await User.find({ id });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Not authorized, invalid token" });
      throw new Error();
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
    throw new Error();
  }
});

module.exports = isAuthenticated;
