const book = require("../schema/bookSchema");

function bookRegister(title, author, year, genre){
  try {
    const newBook = new book({
      title,
      author,
      year,
      genre,
    });
    return newBook.save();
  } catch (error) {
    console.error("Error registering book:", error);
    throw error;
  }
};

module.exports = bookRegister;