const express = require("express");
const asyncHandler = require("express-async-handler");
const Shop = require("../model/shopModel");
const Event = require("../model/eventModel");


//create anew event
const createEvent=asyncHandler(async(req,res,next)=>{
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
  try {
    if (!shop) {
      res.status(400).json({ message: "invalid shop id" });
      throw new Error();
    } else { 
      const productData = req.body;
      productData.shop = shop;
      const event = await Event.create(productData);
      res.status(200).json({
        success: true,
        event,
      });
    }
    next();
  } catch (error) {
    res.status(404).json({message: error.message});
    throw new Error(error.message);
  }
    
})

module.exports={
    createEvent,
}