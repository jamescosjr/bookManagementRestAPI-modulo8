const bookRegister = require("../../infrastructure/repositories/bookRepository.write");
const getAllBooks = require("../../infrastructure/repositories/bookRepository.read");

 function registerBook(title, author, year, genre) {
  try {
    return bookRegister(title, author, year, genre);
  } catch (error) {
    console.error("Error registering book:", error);
    throw error;
  }
}

function getAllBooksService(){
  try {
    return getAllBooks();
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
}

module.exports = {
  registerBook,
  getAllBooksService
};