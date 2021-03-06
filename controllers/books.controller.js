const Book = require('../models/book.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
  Book.find()
    .populate('user')
    .then((books) => res.render('books/list', { books }))
}

module.exports.create = (req, res, next) => {
  User.find()
    .then((users) => res.render('books/form', { book: new Book(), users }));
}

module.exports.doCreate = (req, res, next) => {
  const book = new Book(req.body);

  book.save()
    .then((book) => { res.redirect('/books' )});
}

module.exports.edit = (req, res, next) => {
  Promise.all([
    User.find(),
    Book.findById(req.params.id)
  ])
  .then((results) => {
    const users = results[0];
    const book = results[1]

    res.render('books/form', { book, users })
  })
}

module.exports.doEdit = (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      book.set(req.body);

      book.save()
        .then((book) => { res.redirect('/books' )});
    })
}

module.exports.get = (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {

      User.findById(book.user)
        .then((user) => res.render('books/detail', { book, user }))
    });
}

module.exports.delete = (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/books'));
}
















