const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connecté !");
  } catch (err) {
    console.error("Erreur connexion Mongo :", err);
  }
};

module.exports = connectDB;
