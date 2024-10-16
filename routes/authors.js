const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getAuthorById);
router.get('/:id/books', authorsController.getAuthorBooks);
router.post('/', authorsController.addNewAuthor);
router.put('/:id', authorsController.updateAuthorInfo);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;
