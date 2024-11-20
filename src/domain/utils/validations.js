function validateBookData(book) {
    if (typeof book.title !== 'string') {
      return 'The title should be a valid string';
    }
    if (typeof book.author !== 'string') {
      return 'The author should be a valid string';
    }
    if (typeof book.year !== 'number' || book.year <= 0 || book.year > new Date().getFullYear()) {
      return 'The year should be a valid number greater than 0 and less than or equal to the current year';
    }
    if (typeof book.genre !== 'string') {
      return 'The genre should be a valid string';
    }
    return true;
  }

  module.exports = validateBookData;