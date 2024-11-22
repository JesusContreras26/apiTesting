const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validator = require('../middleware/validator');
const { isAuthenTicated } = require('../middleware/authenticate');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getSingleBook);
router.post(
  '/',
  validator.bookRules(),
  validator.checkAuthorBookData,
  isAuthenTicated,
  bookController.createBook
);
router.put(
  '/:id',
  validator.bookRules(),
  validator.checkAuthorBookData,
  isAuthenTicated,
  bookController.updateBook
);
router.delete('/:id', isAuthenTicated, bookController.deleteBook);

module.exports = router;
