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

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/books/new', (req, res) => {
    res.render('books/new.ejs');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});