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
    const books = bookRepository.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

function findBooksByTitle(req, res) {
  const title = req.params.title;

  try {
      const book = findByTitle(title);

      if (!book) {
          return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(book);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}


function findBooksByAuthor(req, res) {
  const author = req.params.author;

  try {
    const result = findByAuthor(author);
  
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

function findBooksByYear(req, res) {
  const year = req.params.year;

  try {
    const result = findByYear({ year });

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(result);
  } catch (error) {
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
