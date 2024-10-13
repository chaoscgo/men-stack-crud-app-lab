const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Book = require('./models/book.js');
const booksCtrl = require('./controllers/books');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', booksCtrl.home);
app.get('/books', booksCtrl.index);
app.get('/books/new', booksCtrl.newBook);
app.get('/books/:bookId', booksCtrl.show);
app.get("/books/:bookId/edit", booksCtrl.edit);
app.put("/books/:bookId", booksCtrl.update);
app.post('/books', booksCtrl.create);
app.delete("/books/:bookId", booksCtrl.destroy);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});