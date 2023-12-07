const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewars/authUser");
const { createOrder, getUserOrder } = require("../controller/orderController");

// create a new order
router.post("/create-order", createOrder);
// get the order of specific uese
router.get("/get-all-orders/:id", getUserOrder);

module.exports = router;
