const Book = require('../models/book');

const home = async (req, res) => {
    res.render('index.ejs');
};

const index = async (req, res) => {
    const allBooks = await Book.find();
    console.log(allBooks);
    res.render('books/index.ejs', { books: allBooks });
  };

const newBook = async (req, res) => {
    res.render('books/new.ejs');
};

const show = async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render('books/show.ejs', {book: foundBook});
   };

const edit =  async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render('books/edit.ejs', {
        book: foundBook,
    });
};

const update = async (req, res) => {
    if (req.body.recommendation === "on") {
        req.body.recommendation = true;
    } else {
        req.body.recommendation = false;
    }
    await Book.findByIdAndUpdate(req.params.bookId, req.body);
    res.redirect(`/books/${req.params.bookId}`);
};

const create = async (req, res) => {
    if (req.body.recommendation === 'on') {
        req.body.recommendation = true;
    } else {
        req.body.recommendation = false;
    }
    await Book.create(req.body);
    res.redirect('/books');
};

const destroy = async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect('/books');
};
  module.exports = {
    index,
    newBook,
    show,
    edit,
    update,
    create,
    destroy,
    home,
  }