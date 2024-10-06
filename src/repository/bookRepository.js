const idGenerator = require('../utils/idGenerator');

let books = [];

function create(book) {
    const  id = idGenerator();
    const newBook = {id, ...book};
    books.push(newBook);
    return newBook;
}

function findAll() {
    return books;
}

module.exports = {
    create, books, findAll
}