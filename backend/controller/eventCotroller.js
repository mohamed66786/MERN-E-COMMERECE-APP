const asyncHandler = require("express-async-handler");
const Shop = require("../model/shopModel");
const Event = require("../model/eventModel");

//create anew event
const createEvent = asyncHandler(async (req, res, next) => {
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
    res.status(404).json({ message: error.message });
    throw new Error(error.message);
  }
});

// get all specific event products
const getAllEvents = asyncHandler(async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});

//delete specific event
const deleteEvent = asyncHandler(async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({ message: "Event not found with this id" });
      throw new Error();
    }
    const eventId = event._id;
    //event here is the collecton that we return and will remove from it
    await event.deleteOne({ eventId });

    res.status(201).json({
      success: true,
      message: "Event Deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error();
  }
});

// get all events
const getAllEventsData = asyncHandler(async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(400).json({message: error.message});
    throw new Error();
  }
});

module.exports = {
  createEvent,
  getAllEvents,
  deleteEvent,
  getAllEventsData,
};
