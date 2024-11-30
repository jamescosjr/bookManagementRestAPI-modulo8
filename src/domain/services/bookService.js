const { bookRegister, updateBook, deleteBook } = require("../../infrastructure/repositories/bookRepository.write");
const {getAllBooks, getBookByTitle, getByAuthor, getByYear, getByGenre} = require("../../infrastructure/repositories/bookRepository.read");

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

function getBookByTitleService(title){
  try {
    return getBookByTitle(title);
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
}

function getBookByAuthorService(author){
  try {
    return getByAuthor(author);
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
}

function getBookByYearService(year){
  try {
    return getByYear(year);
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
}

function getBookByGenreService(genre){
  try {
    return getByGenre(genre);
  } catch (error) {
    console.error("Error getting books:", error);
    throw error;
  }
}

module.exports = {
  registerBook,
  getAllBooksService,
  updateBookService,
  deleteBookService,
  getBookByTitleService,
  getBookByAuthorService,
  getBookByYearService,
  getBookByGenreService,
};