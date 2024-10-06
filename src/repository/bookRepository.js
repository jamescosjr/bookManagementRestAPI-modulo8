const idGenerator = require("../utils/idGenerator");

let books = [];

function create(book) {
  const id = idGenerator();
  const newBook = { id, ...book };
  books.push(newBook);
  return newBook;
}

function findAll() {
  return books;
}

function updateBook(id, updatedBook) {
  const index = books.findIndex((book) => book.id == id);
  if (index !== -1) {
    books[index] = { id, ...updatedBook };
    return books[index];
  }
}

function deleteBook(id) {
  const index = books.findIndex((book) => book.id == id);
  if (index !== -1) {
    return books.splice(index, 1)[0];
  }
  return null;
}

function findByTitle(title) {
  const booksFiltered = books.filter((book) => {
    if (book.title == title) {
      return book;
    }
  });
  return booksFiltered;
}

function findByAuthor(author) {
  const booksFiltered = books.filter((book) => {
    if (book.author == author) {
      return book;
    }
  });
  return booksFiltered;
}

function findByYear(year) {
  const booksFiltered = books.filter((book) => {
    if (book.year == year) {
      return book;
    }
  });
  return booksFiltered;
}

function findByGenre(genre) {
  const booksFiltered = books.filter((book) => {
    if (book.genre == genre) {
      return book;
    }
  });
  return booksFiltered;
}

module.exports = {
  create,
  books,
  findAll,
  deleteBook,
  updateBook,
  findByTitle,
  findByAuthor,
  findByYear,
  findByGenre,
};
