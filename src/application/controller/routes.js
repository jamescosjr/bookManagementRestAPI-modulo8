const express = require("express");
const { bookRegister, listAllBooks, updateBook, deleteBook, getBookByTitle, getBookByAuthor, getBookByYear, getBookByGenre } = require("./bookController");

const router = express.Router();

router.post("/books", bookRegister);
router.get("/books", listAllBooks);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);
router.get("/books/title/:title", getBookByTitle);
router.get("/books/author/:author", getBookByAuthor);
router.get("/books/year/:year", getBookByYear);
router.get("/books/genre/:genre", getBookByGenre);

module.exports = router;