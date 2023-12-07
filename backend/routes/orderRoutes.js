const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewars/authUser");
const {
  createOrder,
  getUserOrder,
  getShopOrder,
} = require("../controller/orderController");

// create a new order
router.post("/create-order", createOrder);
// get the order of specific uese
router.get("/get-all-orders/:userId", getUserOrder);
router.get("/get-seller-all-orders/:shopId", getShopOrder);

module.exports = router;
