const express=require("express");
const router=express.Router();
const { createEvent } = require("../controller/eventCotroller");


router.post("/create-event",createEvent)


module.exports = router;