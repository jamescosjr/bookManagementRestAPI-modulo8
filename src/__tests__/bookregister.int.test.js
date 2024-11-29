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

describe('Book registration', () => {
    describe('success cases', () => {
        it("call the route to register a book", async () => {
            const book = {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: 1937,
                genre: "Fantasy",
            };

            const response = await request(app).post("/books").send(book);

            const mockExpectBook = {
                _id: expect.any(String),
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: 1937,
                genre: "Fantasy",
                __v: 0,
            };

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(mockExpectBook);
        });
    });

    describe('failure cases', () => {
        it("return an error message for invalid book data", async () => {
            const book = {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: "1937",
                genre: "Fantasy",
            };

            const response = await request(app).post("/books").send(book);

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ message: "The year should be a valid number greater than 0 and less than or equal to the current year" });
        });

        it("return an error message for missing book data", async () => {
            const book = {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: 1937,
            };

            const response = await request(app).post("/books").send(book);

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ message: "The genre should be a valid string" });
        });

        it("return an error message for empty book data", async () => {
            const book = {
                title: "",
                author: "",
                year: 1937,
                genre: "Fantasy",
            };

            const response = await request(app).post("/books").send(book);

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ message: "The title should be a valid string" });
        });
    });
});
