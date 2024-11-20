const bookRegister = require("../../infrastructure/repositories/bookRepository.write");
const getAllBooks = require("../../infrastructure/repositories/bookRepository.read");

const registerBook = async (title, author, year, genre) => {
  try {
    return await bookRegister(title, author, year, genre);
  } catch (error) {
    console.error("Error registering book:", error);
    throw error;
  }
};

const getAllBooksService = async () => {
  try {
    return await getAllBooks();
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
}

module.exports = registerBook, getAllBooksService;