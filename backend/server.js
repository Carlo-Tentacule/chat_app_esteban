require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/users", userRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    path: "/ws",
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
  console.log("Un client est connecté :", socket.id);
  socket.emit("hello", "Bienvenue depuis le serveur !");
  console.log("User-agent:", socket.handshake.headers["user-agent"]);
});

server.listen(3000, () => console.log("Backend lancé sur port 3000"));