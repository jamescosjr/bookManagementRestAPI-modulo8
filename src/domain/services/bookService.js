const { bookRegister, updateBook, deleteBook } = require("../../infrastructure/repositories/bookRepository.write");
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

function updateBookService(id, title, author, year, genre) {
  try {
    return updateBook(id, title, author, year, genre);
  } catch (error) {
    console.error("Error in updateBookService:", error);
    throw error;
  }
}

function deleteBookService(id) {
  try {
    return deleteBook(id);
  } catch (error) {
    console.error("Error in deleteBookService:", error);
    throw error;
  }
}

module.exports = {
  registerBook,
  getAllBooksService,
  updateBookService,
  deleteBookService
};