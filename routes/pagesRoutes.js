const router = require('express').Router();

const catchAsync = require('../utils/catchAsync');

const pagesController = require('../controllers/pagesController');

router.get('/', catchAsync(pagesController.getHomePage));
router.get('/home', (req, res) => {
  res.redirect('/');
});

module.exports = router;
