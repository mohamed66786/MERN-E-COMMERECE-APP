const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
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
    res.status(500).json({ message: error.message });
    throw new Error(error.message);
  }
});

// update order status
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      throw new Error("Order not found");
    }
    if (req.body.status === "Transferred to delivery partner") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }
    order.status = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.1;
      await updateSellerInfo(order.totalPrice - serviceCharge);
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });

    // the two used functions
    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock -= qty;
      product.sold_out += qty;

      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount) {
      const seller = await Shop.findById(
        req.seller ? req.seller._id : "6563c16a6e22db6f476bda65"
      );

      seller.availableBalance = amount;

      await seller.save();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    throw new Error(error.message);
  }
});

// give refund from the user
const refundOrder = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Order not found with this id." });
      throw new Error(`Order not found with this id `);
    }
    order.status = req.body.status;
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      order,
      message: "Order Refund Request successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    throw new Error(error.message);
  }
});

// accept the refund request from seller
const refundOrderSuccess = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(400).json({ message: "Order not found with this id" });
      throw new Error("Order not found with this id");
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Refund successfull!",
    });

    if (req.body.status === "Refund Success") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    // update function
    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock += qty;
      product.sold_out -= qty;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    throw new Error(error.message);
  }
});

module.exports = {
  createOrder,
  getUserOrder,
  getShopOrder,
  updateOrderStatus,
  refundOrder,
  refundOrderSuccess,
};
