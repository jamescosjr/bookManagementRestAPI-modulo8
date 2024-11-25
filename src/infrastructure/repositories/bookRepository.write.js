const Book = require("../schema/bookSchema");

const bookRegister = async (title, author, year, genre) => {
  try {
    const newBook = new Book({
      title,
      author,
      year,
      genre,
    });
    return await newBook.save();
  } catch (error) {
    console.error("Error registering book:", error);
    throw error;
  }
};

module.exports = bookRegister;