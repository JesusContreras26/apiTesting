const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');
const validator = require('../middleware/validator');
const { isAuthenTicated } = require('../middleware/authenticate');

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getAuthorById);
router.get('/:id/books', authorsController.getAuthorBooks);
router.post(
  '/',
  validator.authorRules(),
  validator.checkAuthorBookData,
  isAuthenTicated,
  authorsController.addNewAuthor
);
router.put(
  '/:id',
  validator.authorRules(),
  validator.checkAuthorBookData,
  isAuthenTicated,
  authorsController.updateAuthorInfo
);
router.delete('/:id', isAuthenTicated, authorsController.deleteAuthor);

module.exports = router;
