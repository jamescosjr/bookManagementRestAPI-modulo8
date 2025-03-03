function validateBookData(book) {
  if (typeof book.title !== 'string' || book.title === '') {
    return { valid: false, message: 'The title should be a valid string' };
  }
  if (typeof book.author !== 'string' || book.author === '') {
    return { valid: false, message: 'The author should be a valid string' };
  }
  if (typeof book.year !== 'number' || book.year <= 0 || book.year > new Date().getFullYear()) {
    return { valid: false, message: 'The year should be a valid number greater than 0 and less than or equal to the current year' };
  }
  if (typeof book.genre !== 'string' || book.genre === '') {
    return { valid: false, message: 'The genre should be a valid string' };
  }
  return { valid: true };
}

export default validateBookData;