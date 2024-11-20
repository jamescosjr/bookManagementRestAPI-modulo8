const express = require("express");
const bookRegister = require("./bookController");

const router = express.Router();

router.post("/books", bookRegister);

module.exports = router;