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

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/books', async (req, res) => {
    const allBooks = await Book.find();
    console.log(allBooks);
    res.render('books/index.ejs', { books: allBooks });
  });
   
app.get('/books/new', (req, res) => {
    res.render('books/new.ejs');
});

app.get('/books/:bookId', async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render('books/show.ejs', {book: foundBook});
   });

app.get("/books/:bookId/edit", async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render("books/edit.ejs", {
        book: foundBook,
    });
});

app.put("/books/:bookId", async (req, res) => {
    if (req.body.recommendation === "on") {
        req.body.recommendation = true;
    } else {
        req.body.recommendation = false;
    }
    await Book.findByIdAndUpdate(req.params.bookId, req.body);
    res.redirect(`/books/${req.params.bookId}`);
});

app.post('/books', async (req, res) => {
    if (req.body.recommendation === 'on') {
        req.body.recommendation = true;
    } else {
        req.body.recommendation = false;
    }
    await Book.create(req.body);
    res.redirect('/books');
});

app.delete("/books/:bookId", async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect("/books");
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});