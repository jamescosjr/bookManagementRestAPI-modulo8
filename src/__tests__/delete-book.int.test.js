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

describe('Delete Book', () => {
    it('should delete a book successfully', async () => {
        const newBook = {
            title: 'New Book Title',
            author: 'New Author',
            year: 2022,
            genre: 'Fiction',
        };

        const createdBookResponse = await request(app)
            .post('/books')
            .send(newBook);

        const response = await request(app)
            .delete(`/books/${createdBookResponse.body._id}`);

        expect(response.statusCode).toBe(204);
    });

    it('should return 404 if book not found', async () => {
        const response = await request(app)
            .delete('/books/60f5d0b2f8d4b50008f1b7c1');

        expect(response.statusCode).toBe(404);
    });
});