const express = require("express");
const router = express.Router();
const { isSeller } = require("../middlewars/authUser");
const {
  createShop,
  loginShop,
  getSeller,
  logoutSeller,
  getShopIngo,
} = require("../controller/shopController");

router.post("/create-shop", createShop);
router.post("/login-shop", loginShop);
router.get("/getSeller", isSeller, getSeller);
router.get("/logout", logoutSeller);
router.get("/get-shop-info/:id", getShopIngo);

module.exports = router;
