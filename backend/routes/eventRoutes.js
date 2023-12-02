const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  deleteEvent,
  getAllEventsData,
} = require("../controller/eventCotroller");

router.post("/create-event", createEvent);
router.get("/get-all-events/:id", getAllEvents);
router.get("/get-all-events", getAllEventsData);
router.delete("/delete-shop-event/:id", deleteEvent);

module.exports = router;
