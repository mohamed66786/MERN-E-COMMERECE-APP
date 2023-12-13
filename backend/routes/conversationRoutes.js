const express = require("express");
const router = express.Router();
const { createNewConversation } = require("../controller/conversation");

router.post("/create-new-conversation", createNewConversation);

module.exports = router;
