# 10-Minute Git Demo with Express API

## 1. Initialize Project and Git Repository
```bash
# Create project directory
mkdir books-api
cd books-api

# Initialize Git repository
git init

# Initialize npm and install dependen"cies
npm init -y
npm install express
```

## 2. Create Initial Express Server (main branch)
Create `app.js`:
```javascript
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Books API' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

```bash
# Stage and commit initial setup
git add .
git commit -m "Initial setup: Basic Express server configuration"

# Create GitHub repository (assuming you've created one on GitHub)
git remote add origin https://github.com/yourusername/books-api.git
git branch -M main
git push -u origin main
```

## 3. Add Books Routes (feature branch)
```bash
# Create feature branch
git checkout -b feature/books-routes
```

Update `app.js`:
```javascript
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

// In-memory database
let books = [];

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Books API' });
});

// Get all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Add a book
app.post('/api/books', (req, res) => {
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
```

```bash
# Commit new features
git add app.js
git commit -m "feat: Add GET and POST endpoints for books"
git push origin feature/books-routes
```

## 4. Fix Input Validation (bugfix branch)
```bash
# Create bugfix branch from feature branch
git checkout -b bugfix/input-validation
```

Update `app.js`:
```javascript
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

let books = [];

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Books API' });
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    // Add input validation
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({
            error: 'Title and author are required'
        });
    }

    const book = {
        id: books.length + 1,
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        createdAt: new Date()
    };
    books.push(book);
    res.status(201).json(book);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

```bash
# Commit bugfix
git add app.js
git commit -m "fix: Add input validation for book creation"
git push origin bugfix/input-validation
```

## 5. Merge Changes
```bash
# Merge bugfix into feature branch
git checkout feature/books-routes
git merge bugfix/input-validation

# Create pull request on GitHub for feature branch
# After PR review, merge feature branch into main
git checkout main
git pull origin main
git merge feature/books-routes
git push origin main
```

## 6. Add Delete Functionality (new feature branch)
```bash
# Create new feature branch
git checkout -b feature/delete-book
```

Update `app.js`:
```javascript
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

let books = [];

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Books API' });
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({
            error: 'Title and author are required'
        });
    }

    const book = {
        id: books.length + 1,
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        createdAt: new Date()
    };
    books.push(book);
    res.status(201).json(book);
});

// Add delete endpoint
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    books = books.filter(book => book.id !== id);

    if (books.length === initialLength) {
        return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

```bash
# Commit new delete functionality
git add app.js
git commit -m "feat: Add DELETE endpoint for books"
git push origin feature/delete-book

# Create PR and merge to main after review
git checkout main
git pull origin main
git merge feature/delete-book
git push origin main
```