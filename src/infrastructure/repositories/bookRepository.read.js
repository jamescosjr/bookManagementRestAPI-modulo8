const getAllBooks = async () => {
    try {
        return await book.find();
    } catch (error) {
        console.error("Error getting books:", error);
        throw error;
    }
}

module.exports = getAllBooks;