const { registerBook, getAllBooksService } = require("../../domain/services/bookService.js");
const validateBookData = require("../../domain/utils/validations.js");

async function bookRegister(req, res) {
  try {
    const { title, author, year, genre } = req.body;

    const validation = validateBookData({ title, author, year, genre });
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }
    const result = await registerBook(title, author, year, genre);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error in bookRegister:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function listAllBooks(req, res) {
  try {
    const books = await getAllBooksService();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error to list books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { bookRegister, listAllBooks };