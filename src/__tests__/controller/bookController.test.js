const bookController = require('../../controller/bookController');
const bookRepository = require('../../repository/bookRepository');
const validateBookData = require('../../utils/validations');

jest.mock('../../repository/bookRepository');


describe('bookController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new book', () => {
    const req = {
      body: {
        title: 'test title',
        author: 'test author',
        year: 2021,
        genre: 'test genre',
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockBook = {
      id: 'some-unique-id',
      ...req.body,
    };

    bookRepository.create.mockReturnValue(mockBook);

    bookController.createBookHandler(req, res);

    expect(bookRepository.create).toHaveBeenCalledTimes(1);
    expect(bookRepository.create).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });
  it('should return 400 if validation fails', () => {
    const req = {
      body: {
        title: 'test title',
        author: 'test author',
        year: 2021,
        }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };



    bookRepository.create.mockReturnValue(req.body);

    bookController.createBookHandler(req, res);

    expect(bookRepository.create).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'The genre should be a valid string' });
    });

    it('should return 500 if an error occurs', () => {
      const req = {
        body: {
          title: 'test title',
          author: 'test author',
          year: 2021,
          genre: 'test genre',
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      bookRepository.create.mockImplementation(() => {
        throw new Error('Something went wrong');
      });

      bookController.createBookHandler(req, res);

      expect(bookRepository.create).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });

    it('should list all books', () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockBooks = [
        {
          id: 'some-unique-id',
          title: 'test title',

        },
        {
          id: 'another-unique-id',
          title: 'another test title',
        },
      ];

      bookRepository.findAll.mockReturnValue(mockBooks);

      bookController.listBookHandler(req, res);

      expect(bookRepository.findAll).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should return 500 if an error occurs', () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      bookRepository.findAll.mockImplementation(() => {
        throw new Error('Something went wrong');
      });

      bookController.listBookHandler(req, res);

      expect(bookRepository.findAll).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });

    it("should return 200 and the book when found", () => {
      const req = { params: { title: "Some Book Title" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const book = { title: "Some Book Title", author: "Some Author", year: 2020 };
      jest.spyOn(bookRepository, "findByTitle").mockReturnValue(book);
  
      bookController.findBooksByTitle(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(book);
  });

  it("should return 404 when book is not found", () => {
    const req = { params: { title: "Some Book Title" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
    jest.spyOn(bookRepository, "findByTitle").mockReturnValue(null);

    bookController.findBooksByTitle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 500 when an error occurs", () => {
    const req = { params: { title: "Some Book Title" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
    jest.spyOn(bookRepository, "findByTitle").mockImplementation(() => {
      throw new Error("Some Error");
    });

    bookController.findBooksByTitle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Some Error" });
  });

  it("should return 200 and list of books when found", () => {
    const req = { params: { author: "Some Author" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
    const books = [
      { title: "Some Book Title", author: "Some Author", year: 2020 },
      { title: "Another Book Title", author: "Some Author", year: 2021 },
    ];
    jest.spyOn(bookRepository, "findByAuthor").mockReturnValue(books);
  
    bookController.findBooksByAuthor(req, res);
  
    expect(res.json).toHaveBeenCalledWith(books);
  });

  it("should return 404 when no book is found by author", () => {
    const req = { params: { author: "Some Author" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(bookRepository, "findByAuthor").mockReturnValue(null);

    bookController.findBooksByAuthor(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 500 when an error occurs", () => {
    const req = { params: { author: "Some Author" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(bookRepository, "findByAuthor").mockImplementation(() => {
      throw new Error("Some Error");
    });

    bookController.findBooksByAuthor(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });

  it("should return 200 and list of books when found by year", () => {
    const req = { params: { year: 2020 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
    const books = [
      { title: "Some Book Title", author: "Some Author", year: 2020 },
      { title: "Another Book Title", author: "Another Author", year: 2020 },
    ];
    jest.spyOn(bookRepository, "findByYear").mockReturnValue(books);
  
    bookController.findBooksByYear(req, res);
  
    expect(res.json).toHaveBeenCalledWith(books);
  });

  it("should return 404 when no book is found by year", () => {
    const req = { params: { year: 2020 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(bookRepository, "findByYear").mockReturnValue(null);

    bookController.findBooksByYear(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
  });

  it("should return 500 when an error occurs", () => {
    const req = { params: { year: 2020 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(bookRepository, "findByYear").mockImplementation(() => {
      throw new Error("Some Error");
    });

    bookController.findBooksByYear(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });

});
