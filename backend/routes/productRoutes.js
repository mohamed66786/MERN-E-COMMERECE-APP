const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  deleteProduct,
} = require("../controller/productController");

// product routes
router.post("/create-product", createProduct);
router.get("/get-all-products-shop/:id", getAllProducts);
router.delete("/delete-shop-product/:id", deleteProduct);
module.exports = router;
