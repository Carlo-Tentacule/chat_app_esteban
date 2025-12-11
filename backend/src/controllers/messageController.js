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

exports.getConversations = async (req, res) => {
  const { userId } = req.params;

  try {

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverId",
              "$senderId"
            ]
          },
          lastMessage: { $first: "$content" },
          timestamp: { $first: "$timestamp" }
        }
      }
    ]);


    res.json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur chargement conversations" });
  }
}
