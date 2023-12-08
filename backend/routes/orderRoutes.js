const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewars/authUser");
const {
  createOrder,
  getUserOrder,
  getShopOrder,
  updateOrderStatus,
} = require("../controller/orderController");

// create a new order
router.post("/create-order", createOrder);
// get the order of specific uese
router.get("/get-all-orders/:userId", getUserOrder);
// get all the orders
router.get("/get-seller-all-orders/:shopId", getShopOrder);
// update the order status
router.put("/update-order-status/:id", updateOrderStatus);

module.exports = router;
