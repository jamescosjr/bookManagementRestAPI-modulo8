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

});
