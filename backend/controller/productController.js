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

module.exports = {
  createProduct,
};
