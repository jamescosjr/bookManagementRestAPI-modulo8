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
    

});