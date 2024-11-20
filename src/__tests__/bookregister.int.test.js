describe("Book Register Integration Test", () => {
    const request = require("supertest");
    const app = require("../../server.js");

    beforeAll(() => {
        server = app.listen(3334, () => console.log("Test server running on port 3334"));
    });

    afterAll(() => {
        server.close(() => console.log("Test server closed"));
    });

    it("should register a book", async () => {
        const book = {
            title: "Harry Potter",
            author: "J.K. Rowling",
            year: 2000,
            genre: "Fantasy",
        };

        const response = await request(app).post("/books").send(book);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual(expect.objectContaining({
            _id: expect.any(String),
            title: "Harry Potter",
            author: "J.K. Rowling",
            year: 2000,
            genre: "Fantasy",
        }));

    });

    it("should not register a book with invalid data", async () => {
        const book = {
            title: "Harry Potter",
            title: 12,
            year: "2000",
            genre: "Fantasy",

        };

        const response = await request(app).post("/books").send(book);

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({ message: "Invalid book data" });
    })
});