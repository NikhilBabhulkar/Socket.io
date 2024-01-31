const asyncHandler = require("express-async-handler");
const Chat = require("../models/chats"); // Make sure the path is correct
const User = require("../models/user"); // Make sure the path is correct

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId parameter not sent with request");
    return res.sendStatus(400);
  }

  try {
    // Check if a chat already exists between the users
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      // If no existing chat, create a new one
      const chatData = {
        chatName: "sender", // You may want to customize this
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(fullChat);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// fetchChats for getting all the chats

const fetchChats = asyncHandler(async (req, res) => {
  try {
    const results = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "name pic email",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Creating the group chat

const createGroupChat = asyncHandler(async (req, res) => {
  try {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    // Parse the stringified users array from the request body
    const users = JSON.parse(req.body.users);

    // Create a new group chat
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: [req.user, ...users], // Include the current user in the users array
      isGroupChat: true,
      groupAdmin: req.user,
    });

    // Populate the group chat details
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(201).json({ success: true, data: fullGroupChat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});


const renameGroup = asyncHandler(async (req, res) => {
  try {
    const { chatid, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatid,
      { chatName: chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404).json({ success: false, error: "Chat Not Found" });
    } else {
      res.status(200).json({ success: true, data: updatedChat });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404).json({ success: false, error: "Chat Not Found" });
    } else {
      res.status(200).json({ success: true, data: updatedChat });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId } }, // Use $addToSet to ensure uniqueness
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404).json({ success: false, error: "Chat Not Found" });
    } else {
      res.status(200).json({ success: true, data: updatedChat });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});


module.exports = { accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup };
