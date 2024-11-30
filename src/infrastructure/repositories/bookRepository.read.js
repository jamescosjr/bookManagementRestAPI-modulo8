const Book = require("../schema/bookSchema");

function getAllBooks() {
    try {
        return Book.find();
    } catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

async function getBookByTitle(title) {
    try {
        return Book
            .find({ title });
    }
    catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

async function getByAuthor(author) {
    try {
        return Book
            .find({ author });
    }
    catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

async function getByYear(year) {
    try {
        return Book
            .find({ year });
    }
    catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

async function getByGenre(genre) {
    try {
        return Book
            .find({ genre });
    }
    catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

module.exports = {getAllBooks, getBookByTitle, getByAuthor, getByYear, getByGenre};