import book from '../schema/bookSchema.js';

export async function bookRegister(title, author, year, genre) {
  try {
    const newBook = new book({
      title,
      author,
      year,
      genre,
    });
    return newBook.save();
  } catch (error) {
    next(error);
  }
}

export async function updateBook(id, title, author, year, genre) {
  try {
    return await book.findByIdAndUpdate(
      id,
      { title, author, year, genre },
      { new: true, lean: true }
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(id) {
  try {
    return await book.findByIdAndDelete(id);
  } catch (error) {
    next(error);
  }
}