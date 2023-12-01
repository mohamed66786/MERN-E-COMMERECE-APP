const asyncHandler = require("express-async-handler");
const Shop = require("../model/shopModel");
const CoupounCode = require("../model/coupounCodeModel");

// create coupoun code
const createCouponCode = asyncHandler(async (req, res, next) => {
  try {
    const isCoupounCodeExists = await CoupounCode.find({
      name: req.body.name,
    });

    if (isCoupounCodeExists.length !== 0) {
      res.status(400).json({ message: "Coupoun code already exists!" });
      throw new Error("Coupoun code already exists");
    }

    const coupounCode = await CoupounCode.create(req.body);

    res.status(201).json({
      success: true,
      coupounCode,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });

    throw new Error();
  }
});

// get all coupons of a shop
const getCouponCode = asyncHandler(async (req, res, next) => {
  try {
    const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
    res.status(201).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});

// delete coupoun code of a shop
const deleteCopounCode = asyncHandler(async (req, res, next) => {
  try {
    const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      res.status(400).json({ message: "Coupon code dosen't exists!" });
      throw new Error();
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error();
  }
});

// get coupon code value by its name
const getCouponCodeValue = asyncHandler(async (req, res, next) => {
  try {
    const couponCode = await CoupounCode.findOne({ name: req.params.name });

    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error();
  }
});

module.exports = {
  createCouponCode,
  getCouponCode,
  deleteCopounCode,
  getCouponCodeValue,
};
