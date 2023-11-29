const express = require("express");
const router = express.Router();
const {isSeller} = require("../middlewars/authUser");
const {createShop, loginShop, getSeller,logoutSeller}=require("../controller/shopController")
const {createProduct}=require("../controller/productController")


router.post("/create-shop",createShop);
router.post("/login-shop",loginShop);
router.get("/getSeller",isSeller,getSeller);
router.get("/logout",logoutSeller);




module.exports = router;
