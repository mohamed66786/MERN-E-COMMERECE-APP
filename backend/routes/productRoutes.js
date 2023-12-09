const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getAllProductsShop,
  deleteProduct,
  createNewReview,
} = require("../controller/productController");
const { isAuthenticated } = require("../middlewars/authUser");

// product routes
router.post("/create-product", createProduct);
router.get("/get-all-products-shop/:id", getAllProductsShop);
router.get("/get-all-products", getAllProducts);
router.delete("/delete-shop-product/:id", deleteProduct);
router.put("/create-new-review", isAuthenticated,createNewReview);
module.exports = router;
