const express = require("express");
const { login, getUsers, logout, update } = require("../controllers/userController");
const router = express.Router();

router.post("/login", login);
router.get("/", getUsers);
router.post("/logout", logout);
router.patch("/update", update);

module.exports = router;