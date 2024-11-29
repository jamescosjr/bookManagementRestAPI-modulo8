const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../server');
const dbHandler = require('../../jest/jest.setup');

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Book registration', () => {
    it('call the route to register a book', async () => {
        const book = {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            year: 1937,
            genre: 'Fantasy',
        };

        const response = await request(app)
            .post('/books')
            .send(book);

        expect(response.statusCode).toBe(201);
    });
});
