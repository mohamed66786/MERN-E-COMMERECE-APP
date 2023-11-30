const express = require("express");
const asyncHandler = require("express-async-handler");
const Shop = require("../model/shopModel");
const Event = require("../model/eventModel");


//create anew event
const createEvent=asyncHandler(async(req,res,next)=>{

})

module.exports={
    createEvent,
}