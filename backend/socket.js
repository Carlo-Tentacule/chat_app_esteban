function chatSocket(io) {
  const users = new Map();
  const Message = require("./src/models/Message");

  io.on("connection", (socket) => {
    console.log("Nouveau client connecté :", socket.id);

    socket.on("userConnected", (userId) => {
      users.set(socket.id, userId);
      console.log(`Utilisateur ${userId} connecté`);
      io.emit("onlineUsers", Array.from(users.values()));
    });

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} rejoint la room ${roomId}`);
    });

    socket.on("sendMessage", async ({ roomId, message }) => {
      try {
        const savedMessage = await Message.create({
          senderId: message.senderId,
          receiverId: message.receiverId,
          content: message.content,
          type: message.type || "text",
          timestamp: new Date(),
        });

        console.log("Message sauvegardé :", savedMessage);

        io.to(roomId).emit("receiveMessage", savedMessage);

      } catch (err) {
        console.error("Erreur lors de l'envoi / sauvegarde message :", err);
      }
    });

    socket.on("disconnect", () => {
      const userId = users.get(socket.id);
      users.delete(socket.id);

      console.log(`Utilisateur ${userId} déconnecté`);
      io.emit("onlineUsers", Array.from(users.values()));
    });
  });
}

module.exports = chatSocket;
