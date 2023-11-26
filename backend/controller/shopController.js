const asyncHandler = require("express-async-handler");
const Shop = require("../model/shopModel");
const generateToken = require("../utils/generateToken");

// create shop
const createShop = asyncHandler(async (req, res, next) => {
  const { name, email, password, address, phoneNumber, zipCode } = req.body;
  if (!name || !email || !password || !address || !phoneNumber || !zipCode) {
    return res.status(401).json({ message: "Please enter all fields" });
  }
  const sellerEmail = await Shop.findOne({ email });
  if (sellerEmail) {
    return res
      .status(400)
      .json({ message: "User already exist", seller: sellerEmail });
  }
  const seller = {
    name: name,
    email: email,
    password: password,
    address: address,
    phoneNumber: phoneNumber,
    zipCode: zipCode,
  };
  await Shop.create(seller);
  const newSeller = await Shop.findOne({ email: seller.email });
  generateToken(newSeller, 201, res);
  return res.status(201).json({
    message: "user created successfully",
    seller: {
      _id: newSeller._id,
      name: newSeller.name,
      email: newSeller.email,
    },
  });
});

module.exports = {
  createShop,
};
