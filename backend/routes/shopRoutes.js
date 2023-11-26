const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middlewars/authUser");
const {createShop}=require("../controller/shopController")

router.post("/create-shop",createShop);


module.exports = router;
