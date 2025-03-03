import { bookRegister, updateBook, deleteBook } from "../../infrastructure/repositories/bookRepository.write.js";
import { getAllBooks, getBookByTitle, getByAuthor, getByYear, getByGenre } from "../../infrastructure/repositories/bookRepository.read.js";

import { AppError, NotFoundError } from "../utils/error/customErros.js";

export async function registerBook(title, author, year, genre) {
  try {
    return await bookRegister(title, author, year, genre);
  } catch (error) {
    throw new AppError("Failed to register book", 500);
  }
}

export async function getAllBooksService() {
  try {
    return await getAllBooks();
  } catch (error) {
    throw new AppError("Failed to retrieve books", 500);
  }
}

export async function updateBookService(id, title, author, year, genre) {
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

export async function deleteBookService(id) {
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

export async function getBookByTitleService(title) {
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

export async function getBookByAuthorService(author) {
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

export async function getBookByYearService(year) {
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

export async function getBookByGenreService(genre) {
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