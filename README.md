.

## Features

- Create, read, update, and delete books
- Search for books by title, author, or genre
- Pagination support for large lists of books
- RESTful API design

## Installation

1. Clone the repository:
   ```bash
   git clone /home/jamescarlosdeoliveirajunior/Documentos/WB/bookManagementRestAPI-modulo8
   ```
2. Navigate to the project directory:
   ```bash
   cd bookManagementRestAPI-modulo8
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Access the API

## API Endpoints

- `POST /books` - Add a new book
- `GET /books` - Retrieve a list of books
- `PUT /books/:id` - Update a book by ID
- `DELETE /books/:id` - Delete a book by ID
- `GET /books/title/:title` - Retrieve books by title
- `GET /books/author/:author` - Retrieve books by author
- `GET /books/year/:year` - Retrieve books by year
- `GET /books/genre/:genre` - Retrieve books by genre

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## Acknowledgements

- Thanks to the WhiteBeard team for the exercise and guidance.
- Special thanks to all contributors and maintainers.
