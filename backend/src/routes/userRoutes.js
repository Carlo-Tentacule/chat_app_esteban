const express = require("express");
const { login, getUsers } = require("../controllers/userController");
const router = express.Router();

router.post("/login", login);
router.get("/", getUsers);

module.exports = router;