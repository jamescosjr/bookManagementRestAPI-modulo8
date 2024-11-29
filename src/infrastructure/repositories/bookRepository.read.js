const Book = require("../schema/bookSchema");

function getAllBooks() {
    try {
        return Book.find();
    } catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

module.exports = getAllBooks;