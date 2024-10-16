const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
  const result = await mongodb.getDb().db().collection('books').find();
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const getSingleBook = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('books')
    .find({ _id: bookId });
  result.toArray().then((book) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  });
};

const createBook = async (req, res) => {
  const book = {
    name: req.body.name,
    genders: req.body.genders,
    publishedDate: req.body.publishedDate,
    summary: req.body.summary,
    pages: req.body.pages,
    reviews: req.body.reviews,
    authorId: req.body.authorId,
  };

  const result = await mongodb.getDb().db().collection('books').insertOne(book);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error);
  }
};

const updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Book ID is not valid');
  }

  const bookId = new ObjectId(req.params.id);
  const book = {
    name: req.body.name,
    genders: req.body.genders,
    publishedDate: req.body.publishedDate,
    summary: req.body.summary,
    pages: req.body.pages,
    reviews: req.body.reviews,
    authorId: req.body.authorId,
  };

  const result = await mongodb
    .getDb()
    .db()
    .collection('books')
    .replaceOne({ _id: bookId }, book);

  if (result.modifiedCount) {
    res.status(204).send('The book has been updated');
  } else {
    res
      .status(500)
      .json(result.error || 'Some error occurred updating the book');
  }
};

const deleteBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Book ID is not valid');
  }
  const bookId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDb()
    .db()
    .collection('books')
    .deleteOne({ _id: bookId });

  if (result.deletedCount > 0) {
    res.status(204).send('Book deleted');
  } else {
    res.status(500).json('Some error occurred deleting the book');
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
