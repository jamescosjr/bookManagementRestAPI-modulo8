const bookRepository = require("../repository/bookRepository");
const validateBookData = require("../utils/validations");

function createBookHandler(req, res) {
  const book = req.body;
  const validationResult = validateBookData(book);

  if (validationResult !== true) {
    return res.status(400).json({ message: validationResult });
  }

  const newBook = bookRepository.create(book);
  res.status(201).json(newBook);
}

module.exports = {
  createBookHandler
};
