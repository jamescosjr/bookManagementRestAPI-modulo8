import Book from "../schema/bookSchema.js";

export async function getAllBooks() {
    try {
        return Book.find();
    } catch (error) {
        next(error);
    }
}

export async function getBookByTitle(title) {
    try {
        return Book
            .find({ title });
    }
    catch (error) {
        next(error);
    }
}

export async function getByAuthor(author) {
    try {
        return Book
            .find({ author });
    }
    catch (error) {
        next(error);
    }
}

export async function getByYear(year) {
    try {
        return Book
            .find({ year });
    }
    catch (error) {
        next(error);
    }
}

export async function getByGenre(genre) {
    try {
        return Book
            .find({ genre });
    }
    catch (error) {
        next(error);
    }
}