const express = require("express");
const router = express.Router();
const {isSeller} = require("../middlewars/authUser");
const {createShop, loginShop, getSeller}=require("../controller/shopController")

router.post("/create-shop",createShop);
router.post("/login-shop",loginShop);
router.get("/getSeller",isSeller,getSeller);


module.exports = router;
