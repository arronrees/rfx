const router = require('express').Router();

const catchAsync = require('../utils/catchAsync');

const authController = require('../controllers/authController');
const { validateUserObject } = require('../middleware/validateUserObject');

router.get('/auth/sign-up', catchAsync(authController.getSignUp));

router.post('/auth/sign-up', validateUserObject, authController.postSignUp);

module.exports = router;
