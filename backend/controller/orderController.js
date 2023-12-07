const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const Product = require("../model/productModel");

//create a new order
const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    //   group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});

// get all orders of specific user
const getUserOrder = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});

// get all seller orders
const getShopOrder = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});

module.exports = {
  createOrder,
  getUserOrder,
  getShopOrder,
};
