const router = require('express').Router();

const catchAsync = require('../utils/catchAsync');

const pagesController = require('../controllers/pagesController');

router.get('/', catchAsync(pagesController.getHomePage));
router.get('/home', (req, res) => {
  res.redirect('/');
});

router.get(
  '/clock-osciallators',
  catchAsync(pagesController.getClockOscillators)
);

router.get('/quartz-crystals', catchAsync(pagesController.getQuartzCrystals));

module.exports = router;
