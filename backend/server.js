require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/users", userRoutes);

app.listen(3000, () => console.log("Backend lancé sur port 3000"));