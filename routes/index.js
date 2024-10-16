const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Running');
});

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));

module.exports = router;
