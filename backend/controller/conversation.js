const asyncHandler = require("express-async-handler");
const Conversation = require("../model/conversation");
const createNewConversation = asyncHandler(async (req, res, next) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;

    const isConversationExist = await Conversation.findOne({ groupTitle });

    if (isConversationExist) {
      const conversation = isConversationExist;
      res.status(201).json({
        success: true,
        conversation,
      });
    } else {
      const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.response.message });
    throw new Error(error.response.message);
  }
});

module.exports = {
  createNewConversation,
};
