const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewars/authUser");
const {
  createOrder,
  getUserOrder,
  getShopOrder,
  updateOrderStatus,
  refundOrder,
  refundOrderSuccess,
} = require("../controller/orderController");

// create a new order
router.post("/create-order", createOrder);
// get the order of specific uese
router.get("/get-all-orders/:userId", getUserOrder);
// get all the orders
router.get("/get-seller-all-orders/:shopId", getShopOrder);
// update the order status
router.put("/update-order-status/:id", updateOrderStatus);
// refund the order from the user
router.put("/order-refund/:id", refundOrder);
// accept the refund  order from seller 
router.put("order-refund-success/:id", refundOrderSuccess);
module.exports = router;
