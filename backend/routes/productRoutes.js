const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getAllProductsShop,
  deleteProduct,
} = require("../controller/productController");

// product routes
router.post("/create-product", createProduct);
router.get("/get-all-products-shop/:id", getAllProductsShop);
router.get("/get-all-products", getAllProducts);
router.delete("/delete-shop-product/:id", deleteProduct);
module.exports = router;
