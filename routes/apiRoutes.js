const router = require('express').Router();

const catchAsync = require('../utils/catchAsync');

const apiController = require('../controllers/apiController');

router.get('/api/quartz-crystals', catchAsync(apiController.getQuartzCrystals));

module.exports = router;
