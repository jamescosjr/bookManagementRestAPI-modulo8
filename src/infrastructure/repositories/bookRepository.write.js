const book = require('../schema/bookSchema.js');

function bookRegister(title, author, year, genre) {
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
}

async function updateBook(id, title, author, year, genre) {
  try {
    return await book.findByIdAndUpdate(
      id,
      { title, author, year, genre },
      { new: true, lean: true }
    );
  } catch (error) {
    console.error("Error updating book in repository:", error);
    throw error;
  }
}

async function deleteBook(id) {
  try {
    return await book.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting book in repository:", error);
    throw error;
  }
}

module.exports = { bookRegister, updateBook, deleteBook };