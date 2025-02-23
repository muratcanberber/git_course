const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

// In-memory database
let books = [];

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Books API!!' });
});

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Add a book
app.post('/api/books', (req, res) => {

  if (!req.body.title || !req.body.author) {
    return res.status(400).json({
        error: 'Title and author are required'
    });
}

  const book = {
      id: books.length + 1,
      title: req.body.title,
      author: req.body.author
  };
  books.push(book);
  res.status(201).json(book);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});