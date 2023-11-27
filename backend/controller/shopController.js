const asyncHandler = require("express-async-handler");
const Shop = require("../model/shopModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// create shop seller
const createShop = asyncHandler(async (req, res, next) => {
  const { name, phoneNumber, email, address, zipCode, password } = req.body;
  if (!name || !email || !password || !address || !phoneNumber || !zipCode) {
    res.status(401).json({ message: "Please enter all fields" });
    throw new Error();
  }
  const sellerEmail = await Shop.findOne({ email });
  if (sellerEmail) {
    res
      .status(400)
      .json({ message: "User already exist", seller: sellerEmail });
    throw new Error();
  }
  const seller = {
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    address: address,
    zipCode: zipCode,
    password: password,
  };
  await Shop.create(seller);
  const newSeller = await Shop.findOne({ email: seller.email });
  generateToken(newSeller, 201, res, "sellerToken");
  res.status(201).json({
    message: "user created successfully",
    seller: {
      _id: newSeller._id,
      name: newSeller.name,
      email: newSeller.email,
    },
  });
});

// login shop
const loginShop = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
     res.status(401).json({ message: "please enter your email and password" });
    next();
    }
  const seller = await Shop.findOne({ email });
  const isValidPassword =await seller.comparePassword(password)
  if (
    seller.email === email 
    && isValidPassword
  ) {
    generateToken(seller, 201, res, "sellerToken");
     res
      .status(200)
      .json({ message: "seller was connected successfully" });
      next();
  } else {
    res.status(400).json({
      message:
        "Seller Not exitst in Database OR email or password was not correct ",
    });
    throw new Error();
  }
});


// load seller 
const getSeller = asyncHandler(async (req, res, next) => {
  const id = req.seller.id;
  const seller = await Shop.findById(id);
  try {
    const findSeller = await Shop.findById(req.seller.id);

    if (!findSeller) {
      res.status(400).json({ message: "User not found" });
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      findSeller,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    throw new Error();
    }
});

module.exports = {
  createShop,
  loginShop,
  getSeller
};
