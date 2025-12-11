require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const chatSocket = require("./socket");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    path: "/ws",
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

chatSocket(io);

server.listen(3000, () => console.log("Backend lancé sur port 3000"));