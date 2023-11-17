const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  // first generate the token
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY || "some secret",
    {
      expiresIn: "30d",
    }
  );
  // then save it in the cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

module.exports = generateToken;
