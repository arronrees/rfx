const router = require('express').Router();

const catchAsync = require('../utils/catchAsync');

const userController = require('../controllers/userController');
const { checkLoggedInRedirect } = require('../middleware/authMiddleware');

router.get(
  '/user/profile',
  checkLoggedInRedirect,
  catchAsync(userController.getProfile)
);

module.exports = router;
