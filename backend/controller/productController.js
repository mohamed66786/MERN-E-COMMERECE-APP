const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/ErrorHandler");
const Order= require("../model/orderModel");

// create a new product
const createProduct = asyncHandler(async (req, res, next) => {
  const shopId = req.body.shopId;
  const shop = await Shop.findById(shopId);

  if (!shop) {
    res.status(400).json({ message: "invalid shop id" });
    throw new Error();
  } else {
    const productData = req.body;
    productData.shop = shop;
    const product = await Product.create(productData);
    res.status(200).json({
      success: true,
      product,
    });
  }
});

// get all products
const getAllProductsShop = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found with this id" });
      throw new Error();
    }
    const productId = product._id;
    await product.deleteOne({ productId });

    res.status(201).json({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error();
  }
});

// get all product
const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // const products = await Product.find()

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});

const createNewReview = asyncHandler(async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;

    const product = await Product.findById(productId);

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reviwed succesfully!",
    });
  } catch (error) {}
});

module.exports = {
  createProduct,
  getAllProductsShop,
  deleteProduct,
  getAllProducts,
  createNewReview,
};
