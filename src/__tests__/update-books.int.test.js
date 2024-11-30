const request = require('supertest');
const app = require('../../server');
const dbHandler = require('../../jest/jest.setup');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe('Update Book', () => {
    it('should update a book successfully', async () => {
        const newBook = {
            title: 'New Book Title',
            author: 'New Author',
            year: 2022,
            genre: 'Fiction',
        };

        const createdBookResponse = await request(app)
            .post('/books')
            .send(newBook);

        const updatedBook = {
            title: 'Updated Book Title',
            author: 'Updated Author',
            year: 2023,
            genre: 'Non-Fiction',
        };

        const response = await request(app)
            .put(`/books/${createdBookResponse.body._id}`)
            .send(updatedBook);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedBook.title);
        expect(response.body.author).toBe(updatedBook.author);
        expect(response.body.year).toBe(updatedBook.year);
        expect(response.body.genre).toBe(updatedBook.genre);
    });

    it('should return 404 if book not found', async () => {
        const updatedBook = {
            title: 'Updated Book Title',
            author: 'Updated Author',
            year: 2023,
            genre: 'Non-Fiction',
        };

        const response = await request(app)
            .put('/books/60f5d0b2f8d4b50008f1b7c1')
            .send(updatedBook);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Book not found');
    });
    
    it('should return 400 if book data is invalid', async () => {
        const newBook = {
            title: 'New Book Title',
            author: 'New Author',
            year: 2022,
            genre: 'Fiction',
        };

        const createdBookResponse = await request(app)
            .post('/books')
            .send(newBook);

        const updatedBook = {
            title: '',
            author: 'Updated Author',
            year: 2023,
            genre: 'Non-Fiction',
        };

        const response = await request(app)
            .put(`/books/${createdBookResponse.body._id}`)
            .send(updatedBook);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("The title should be a valid string");
    });
});
