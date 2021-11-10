const router = require('express').Router();

const catchAsync = require('../utils/catchAsync');

const userController = require('../controllers/userController');

router.get('/user/profile', catchAsync(userController.getProfile));

module.exports = router;
