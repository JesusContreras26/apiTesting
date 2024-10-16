const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('authors').find();
  result.toArray().then((authors) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  });
};

const getAuthorById = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('authors')
    .find({ _id: userId });
  result.toArray().then((author) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(author);
  });
};

const addNewAuthor = async (req, res) => {
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    favoriteGenders: req.body.favoriteGenders,
    authorId: req.body.authorId,
  };

  const result = await mongodb
    .getDb()
    .db()
    .collection('authors')
    .insertOne(author);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || 'Some error ocurred creating the new author');
  }
};

const updateAuthorInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Author ID is not valid');
  }
  const userId = new ObjectId(req.params.id);
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    favoriteGenders: req.body.favoriteGenders,
    authorId: req.body.authorId,
  };

  const result = await mongodb
    .getDb()
    .db()
    .collection('authors')
    .replaceOne({ _id: userId }, author);

  if (result.modifiedCount) {
    res.status(204).json('The author has been updated');
  } else {
    res
      .status(500)
      .json(
        result.error || 'Some error occurred updating the author information'
      );
  }
};

const deleteAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Author ID is not valid');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('authors')
    .deleteOne({ _id: userId }, true);

  if (result.deletedCount > 0) {
    res.status(204).send('Author deleted');
  } else {
    res
      .status(500)
      .json(
        result.error ||
          'Some error occurred deleting the author from the database'
      );
  }
};

const getAuthorBooks = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Author ID is not valid');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('authors')
    .find({ _id: userId });
  const mongoData = await result.toArray();
  const books = await mongodb
    .getDb()
    .db()
    .collection('books')
    .find({ authorId: mongoData[0].authorId });
  books.toArray().then((books) => {
    res.status(200).json({ author: mongoData, authorBooks: books });
  });
};

module.exports = {
  getAll,
  getAuthorById,
  getAuthorBooks,
  deleteAuthor,
  addNewAuthor,
  updateAuthorInfo,
};
