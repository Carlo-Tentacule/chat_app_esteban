const express = require("express");
const { sendMessage, getMessages, getConversations } = require("../controllers/messageController");
const router = express.Router();

router.post("/", sendMessage);
router.get("/conversations/:userId", getConversations);
router.get("/:user1/:user2", getMessages);
module.exports = router;
