const { bookRegister, updateBook, deleteBook } = require("../../infrastructure/repositories/bookRepository.write");
const {getAllBooks, getBookByTitle, getByAuthor, getByYear, getByGenre} = require("../../infrastructure/repositories/bookRepository.read");

const { AppError, NotFoundError } = require("../utils/error/customErros");

async function registerBook(title, author, year, genre) {
  try {
    return await bookRegister(title, author, year, genre);
  } catch (error) {
    throw new AppError("Failed to register book", 500);
  }
}

async function getAllBooksService() {
  try {
    return await getAllBooks();
  } catch (error) {
    throw new AppError("Failed to retrieve books", 500);
  }
}

async function updateBookService(id, title, author, year, genre) {
  try {
    const result = await updateBook(id, title, author, year, genre);
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new AppError("Failed to update book", 500);
  }
}

async function deleteBookService(id) {
  try {
    const result = await deleteBook(id);
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new AppError("Failed to delete book", 500);
  }
}

async function getBookByTitleService(title) {
  try {
    const result = await getBookByTitle(title);
    if (!result || result.length === 0) {
      throw new NotFoundError();
    }
    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new AppError("Failed to retrieve book by title", 500);
  }
}

async function getBookByAuthorService(author) {
  try {
    const result = await getByAuthor(author);
    if (!result || result.length === 0) {
      throw new NotFoundError();
    }
    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new AppError("Failed to retrieve book by author", 500);
  }
}

async function getBookByYearService(year) {
  try {
    const result = await getByYear(year);
    if (!result || result.length === 0) {
      throw new NotFoundError();
    }
    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new AppError("Failed to retrieve book by year", 500);
  }
}

async function getBookByGenreService(genre) {
  try {
    const result = await getByGenre(genre);
    if (!result || result.length === 0) {
      throw new NotFoundError();
    }
    return result;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new AppError("Failed to retrieve book by genre", 500);
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