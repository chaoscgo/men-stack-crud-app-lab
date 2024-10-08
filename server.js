const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Book = require('./models/book.js');

app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/books/new', (req, res) => {
    res.render('books/new.ejs');
});

app.post('/books', async (req, res) => {
    if (req.body.recommendation === 'on') {
        req.body.recommendation = true;
    } else {
        req.body.recommendation = false;
    }
    await Book.create(req.body);
    res.redirect('/books/new');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});