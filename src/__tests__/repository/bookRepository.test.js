const bookRepository = require('../../repository/bookRepository');
const idGenerator = require('../../utils/idGenerator');
const {books} = require('../../repository/bookRepository');

describe('bookRepository', () => {

    beforeEach(() => {
        books.length = 0;
    });
    it ('should create a new book with a unique id', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        expect (books).toEqual([{
            id: newBook.id,
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        },
    ]);
    });
    it('should return all books', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const allBooks = bookRepository.findAll();

        expect(allBooks).toEqual([{
            id: newBook.id,
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }]);
    });
    it ('should update a book', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const updatedBook = {
            title : 'updated title',
            author : 'updated author',
            year: 2022,
            genre: 'updated genre',
        }

        const result = bookRepository.updateBook(newBook.id, updatedBook);

        expect(result).toEqual({
            id: newBook.id,
            title : 'updated title',
            author : 'updated author',
            year: 2022,
            genre: 'updated genre',
        });
    });
    it ('should delete a book', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }

        const newBook2 = bookRepository.create(book);
        const newBook = bookRepository.create(book);

        const result = bookRepository.deleteBook(newBook.id);

        expect(books).toEqual([newBook2]);
        
    });
    it('should return null if no book is found to delete', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }

        const newBook = bookRepository.create(book);

        const result = bookRepository.deleteBook('wrong id');

        expect(result).toBe(null);
    });
    it('should find a book by title', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const result = bookRepository.findByTitle('test title');

        expect(result).toEqual([{
            id: newBook.id,
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }]);
    });
    it('should return an empty array if no book is found by title', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const result = bookRepository.findByTitle('test wrong title');

        expect(result).toEqual([]);
    });
    it('should find a book by author', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const result = bookRepository.findByAuthor('test author');

        expect(result).toEqual([{
            id: newBook.id,
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }]);
    });
    it('should return an empty array if no book is found by author', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const result = bookRepository.findByAuthor('test wrong author');

        expect(result).toEqual([]);
    });
    it('should find a book by year', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const result = bookRepository.findByYear(2021);

        expect(result).toEqual([{
            id: newBook.id,
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }]);
    });
    it('should return an empty array if no book is found by year', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const result = bookRepository.findByYear(2022);

        expect(result).toEqual([]);
    });
    it('should find a book by genre', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const result = bookRepository.findByGenre('test genre');

        expect(result).toEqual([{
            id: newBook.id,
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }]);
    });
    it('should return an empty array if no book is found by genre', () => {
        const book = {
            title : 'test title',
            author : 'test author',
            year: 2021,
            genre: 'test genre',
        }
        const newBook = bookRepository.create(book);

        const result = bookRepository.findByGenre('test wrong genre');

        expect(result).toEqual([]);
    });
    

});