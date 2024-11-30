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

describe('get Book by title', () => {
    it('should return books successfully', async () => {
        const newBook = {
          title: 'New Book Title',
          author: 'New Author',
          year: 2022,
          genre: 'Fiction',
        };
      
         await request(app)
          .post('/books')
          .send(newBook);      
   
        const response = await request(app)
          .get(`/books/title/${encodeURIComponent(newBook.title)}`);        
     
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([ 
          expect.objectContaining({
            title: 'New Book Title',
            author: 'New Author',
            year: 2022,
            genre: 'Fiction',
          }),
        ]));
      });

      it('should return 404 if book not found', async () => {
        const response = await request(app)
          .get('/books/Not Found Title');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({});
      });
});