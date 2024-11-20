const registerBook = require("../../domain/services/bookService");
const validateBookData = require("../../domain/utils/validations");

const bookRegister = async (req, res) => {
  try {
    const { title, author, year, genre } = req.body;

    if (!validateBookData({ title, author, year, genre })) {
      return res.status(400).json({ message: "Invalid book data" });
    }

    const result = await registerBook(title, author, year, genre);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error in bookRegister:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = bookRegister;