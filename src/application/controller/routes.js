const express = require("express");
const { bookRegister, listAllBooks, updateBook, deleteBook } = require("./bookController");

const router = express.Router();

router.post("/books", bookRegister);
router.get("/books", listAllBooks);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;