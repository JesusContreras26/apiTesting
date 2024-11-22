const { body, validationResult } = require('express-validator');
const validate = {};

validate.authorRules = () => {
  return [
    body('firstName')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid first name'),
    body('lastName')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid Last Name'),
    body('birthday').notEmpty().trim(),
    body('favoriteGenders')
      .notEmpty()
      .trim()
      .isLength({ min: 1 })
      .isArray({ min: 1 }),
    body('authorId').isLength({ min: 1 }).notEmpty().trim(),
  ];
};

validate.bookRules = () => {
  return [
    body('name').exists().notEmpty().isLength({ min: 1 }),
    body('genders')
      .exists()
      .notEmpty()
      .isLength({ min: 1 })
      .isArray({ min: 1 })
      .trim(),
    body('publishedDate').exists().notEmpty().isLength({ min: 1 }).trim(),
    body('summary').exists().notEmpty().isLength({ min: 1 }).trim(),
    body('pages').exists().notEmpty().isLength({ min: 1 }).trim(),
    body('reviews')
      .exists()
      .notEmpty()
      .isLength({ min: 1 })
      .isArray({ min: 1 }),
    body('authorId').isLength({ min: 1 }).notEmpty().trim(),
  ];
};

validate.checkAuthorBookData = (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((element) => {
        return element.msg;
      }),
    });
  }
  next();
};

module.exports = validate;
