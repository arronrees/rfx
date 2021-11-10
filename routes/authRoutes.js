const router = require('express').Router();

const catchAsync = require('../utils/catchAsync');

const authController = require('../controllers/authController');
const { validateUserObject } = require('../middleware/validateUserObject');
const { checkLoggedInRedirect } = require('../middleware/authMiddleware');

router.get(
  '/auth/sign-up',
  checkLoggedInRedirect,
  catchAsync(authController.getSignUp)
);

router.post('/auth/sign-up', validateUserObject, authController.postSignUp);

module.exports = router;
