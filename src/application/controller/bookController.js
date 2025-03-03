import { registerBook, getAllBooksService, updateBookService, deleteBookService, getBookByTitleService, getBookByAuthorService, getBookByYearService, getBookByGenreService } from "../../domain/services/bookService.js";
import validateBookData from "../../domain/utils/validations.js";

import { NotFoundError, ValidationError } from "../../domain/utils/error/customErros.js";

async function bookRegister(req, res, next) {
  try {
    const { title, author, year, genre } = req.body;

    const validation = validateBookData({ title, author, year, genre });
    if (!validation.valid) {
      throw new ValidationError(validation.message);
    }

    const result = await registerBook(title, author, year, genre);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function listAllBooks(req, res, next) {
  try {
    const books = await getAllBooksService();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const { title, author, year, genre } = req.body;

    const validation = validateBookData({ title, author, year, genre });
    if (!validation.valid) {
      throw new ValidationError(validation.message);
    }

    const result = await updateBookService(id, title, author, year, genre);
    if (!result) {
      throw new NotFoundError();
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    const result = await deleteBookService(id);
    if (!result) {
      throw new NotFoundError();
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function getBookByTitle(req, res, next) {
  try {
    const { title } = req.params;
    const result = await getBookByTitleService(title);
    if (!result || result.length === 0) {
      throw new NotFoundError();
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getBookByAuthor(req, res, next) {
  try {
    const { author } = req.params;
    const result = await getBookByAuthorService(author);
    if (!result || result.length === 0) {
      throw new NotFoundError();
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getBookByYear(req, res, next) {
  try {
    const { year } = req.params;
    const result = await getBookByYearService(year);
    if (!result || result.length === 0) {
      throw new NotFoundError();
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getBookByGenre(req, res, next) {
  try {
    const { genre } = req.params;
    const result = await getBookByGenreService(genre);
    if (!result || result.length === 0) {
      throw new NotFoundError();
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export { bookRegister, listAllBooks, updateBook, deleteBook, getBookByTitle, getBookByAuthor, getBookByYear, getBookByGenre };