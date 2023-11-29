const express = require("express");
const router = express.Router();
const {createProduct}=require("../controller/productController")



// product routes
router.post("/create-product",createProduct);

module.exports = router;