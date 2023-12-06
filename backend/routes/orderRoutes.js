const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewars/authUser");
const { createOrder } = require("../controller/orderController");

// create a new order
router.post("/create-order", isAuthenticated, createOrder);

module.exports = router;