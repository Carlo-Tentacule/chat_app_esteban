function chatSocket(io) {
  const users = new Map();

  io.on("connection", socket => {
    console.log("Nouveau client :", socket.id);

    socket.on("userConnected", userId => {
      users.set(socket.id, userId);
      console.log(`Utilisateur ${userId} connecté`);
      io.emit("onlineUsers", Array.from(users.values())); 
    });

    socket.on("joinRoom", roomId => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} rejoint la room ${roomId}`);
    });

    socket.on("sendMessage", ({ roomId, message }) => {
      io.to(roomId).emit("receiveMessage", message);
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
