const express = require("express");
const { bookRegister, listAllBooks } = require("./bookController");

const router = express.Router();

router.post("/books", bookRegister);
router.get("/books", listAllBooks);

module.exports = router;