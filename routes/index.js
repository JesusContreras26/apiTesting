const express = require('express');
const { route } = require('./authors');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/authors', require('./authors'));
router.use('/books', require('./books'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
