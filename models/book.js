const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    recommendation: Boolean,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

