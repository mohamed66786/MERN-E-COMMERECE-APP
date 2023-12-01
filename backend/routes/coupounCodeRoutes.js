const express = require("express");
const router = express.Router();
const {
  createCouponCode,
  getCouponCode,
  deleteCopounCode,
  getCouponCodeValue,
} = require("../controller/coupounCodeController");
const { isSeller } = require("../middlewars/authUser");


router.post("/create-coupon-code",isSeller,  createCouponCode);
router.get("/get-coupon/:id", isSeller, getCouponCode);
router.delete("/delete-coupon/:id",isSeller,  deleteCopounCode);
router.get("/get-coupon-value/:name", getCouponCodeValue);

module.exports = router;
