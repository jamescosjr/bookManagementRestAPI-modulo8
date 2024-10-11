const bookRepository = require("../repository/bookRepository");
const validateBookData = require("../utils/validations");

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
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function listBookHandler(req, res) {
  try {
    const books = bookRepository();
    res.json(books);
  } catch (error) {
    console.error("Error listing books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  createBookHandler,
  listBookHandler
};
