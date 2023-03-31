const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const { getListings } = require("../controllers/listings");

router.get("/", getListings);

module.exports = router;
