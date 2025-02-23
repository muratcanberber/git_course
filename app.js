const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Books API!!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});