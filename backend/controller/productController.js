const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/ErrorHandler");

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



const getAllProducts=asyncHandler(async(req,res,next)=>{
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
})

module.exports = {
  createProduct,
  getAllProductsShop,
  deleteProduct,
  getAllProducts,
};
