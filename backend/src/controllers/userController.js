const User = require("../models/User");

exports.login = async (req, res) => {
  const { username } = req.body;

  let user = await User.findOne({ username });

  if (!user) {
    user = await User.create({ username, isOnline: true });
  }

  user.isOnline = true;
  await user.save();

  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.logout = async (req, res) => {
  const { userId } = req.body;
  await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: Date.now() });
  res.json({ message: "Déconnecté" });
};

exports.update = async (req, res) => {
  const { userId, newUsername } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username: newUsername },
    { new: true }
  );

  res.json(updatedUser);
};