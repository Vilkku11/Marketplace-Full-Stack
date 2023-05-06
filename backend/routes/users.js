const express = require("express");
const router = express.Router();

const { loginUser, signUpUser } = require("../controllers/users");
// routes
router.post("/signup", signUpUser);
router.post("/login", loginUser);

module.exports = router;
