const express = require("express");
const { protect } = require("../middleware/AuthMiddleware");
const { accessChat,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup } = require("../Controllers/chatController");
const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect,fetchChats)
router.route("/group").post(protect,createGroupChat)
router.route("/rename").post(protect,renameGroup)
router.route("/groupremove").put(protect,removeFromGroup)
router.route("/addtogroup").put(protect,addToGroup)

module.exports = router;
