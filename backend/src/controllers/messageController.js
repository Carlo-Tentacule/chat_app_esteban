const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content, type } = req.body;

  const message = await Message.create({
    senderId,
    receiverId,
    content,
    type
  });

  res.json(message);
};

exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  });

  res.json(messages);
};
