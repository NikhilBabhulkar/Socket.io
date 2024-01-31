const asyncHandler = require('express-async-handler')
const Message = require("../models/message")
const Chat = require("../models/chats")

const sendMessage = asyncHandler(async (req, res) => {
    try {
      const { content, chatid } = req.body;
  
      // Check if content or chatId is missing
      if (!content || !chatid) {
        console.log("Invalid data passed");
        return res.sendStatus(400);
      }
  
      // Create a new message
      const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatid,
      };
  
      // Create the message and populate the sender field
      let message = await Message.create(newMessage);
      message = await Message.populate(message, { path: "sender", select: "name pic" });
  
      // Fetch the chat with the new message
      const updatedChat = await Chat.findOneAndUpdate(
        { _id: chatid },
        { $set: { latestMessage: message._id } },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage");
  
      if (!updatedChat) {
        console.log("Chat not found");
        return res.sendStatus(404);
      }
  
      res.status(201).json({ success: true, data: updatedChat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  });
  
  const allMessages = asyncHandler(async (req, res) => {
    try {
      const chatId = req.params.chatId;
  
      // Fetch all messages for the given chat ID
      const messages = await Message.find({ chat: chatId })
        .populate('sender', 'name pic') // Populate the 'sender' field with specified fields
        .sort({ createdAt: 1 }); // Adjust the sorting as needed
  
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  });
  
module.exports = {
    sendMessage,
    allMessages,
  };
  