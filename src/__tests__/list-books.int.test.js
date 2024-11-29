const request = require('supertest');
const app = require('../../server');
const dbHandler = require('../../jest/jest.setup');
const mongoose = require('mongoose');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe('list all books', () => {
    describe('success cases', () => {
        it("call the route to list all books", async () => {
            const book = {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: 1937,
                genre: "Fantasy",
            };

            await request(app).post("/books").send(book);

            const response = await request(app).get("/books");

            const mockExpectBook = {
                _id: expect.any(String),
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: 1937,
                genre: "Fantasy",
                __v: 0,
            };

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([expect.objectContaining(mockExpectBook)])
            );
            expect(response.body).toHaveLength(1);
        });

        it('return an empty array when there are no books registered', async () => {
            const response = await request(app).get("/books");

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('return an array with multiple books', async () => {
            const book1 = {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: 1937,
                genre: "Fantasy",
            };

            const book2 = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954,
                genre: "Fantasy",
            };

            await request(app).post("/books").send(book1);
            await request(app).post("/books").send(book2);

            const response = await request(app).get("/books");

            const mockExpectBook1 = {
                _id: expect.any(String),
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: 1937,
                genre: "Fantasy",
                __v: 0,
            };

            const mockExpectBook2 = {
                _id: expect.any(String),
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954,
                genre: "Fantasy",
                __v: 0,
            };

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([expect.objectContaining(mockExpectBook1)])
            );
            expect(response.body).toEqual(
                expect.arrayContaining([expect.objectContaining(mockExpectBook2)])
            );
            expect(response.body).toHaveLength(2);
        });
    });
});