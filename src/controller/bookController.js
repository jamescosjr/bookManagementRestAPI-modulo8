const bookRepository = require("../repository/bookRepository");
const validateBookData = require("../utils/validations");
const {findByTitle} = require("../repository/bookRepository");
const {findByAuthor} = require("../repository/bookRepository");
const {findByYear} = require("../repository/bookRepository");


function createBookHandler(req, res) {
  try {
    const book = req.body;
    const validationResult = validateBookData(book);

    if (validationResult !== true) {
      return res.status(400).json({ message: validationResult });
    }

    const newBook = bookRepository.create(book);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

function listBookHandler(req, res) {
  try {
    const books = bookRepository();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

function findBooksByTitle(req, res) {

  try {
    const { title } = req.query;
    const result = findByTitle({ title });
    res.json(result);

  } catch (error) {
    console.error("Error searching books by title:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function findBooksByAuthor(req, res) {

  try {
    const { author } = req.query;
    const result = findByAuthor({ author });
    res.json(result);

  } catch (error) {
    console.error("Error searching books by author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function findBooksByYear(req, res) {

  try {
    const { year } = req.query;
    const result = findByYear({ year });
    res.json(result);

  } catch (error) {
    console.error("Error searching books by year:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  createBookHandler,
  listBookHandler,
  findBooksByTitle,
  findBooksByAuthor,
  findBooksByYear,
};
