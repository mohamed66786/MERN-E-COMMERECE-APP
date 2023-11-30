const express=require("express");
const router=express.Router();
const { createEvent,getAllEvents,deleteEvent } = require("../controller/eventCotroller");


router.post("/create-event",createEvent)
router.get("/get-all-events/:id",getAllEvents)
router.delete("/delete-shop-event/:id",deleteEvent)

module.exports = router;