const router = require('express').Router();

const authController = require('../controllers/authController');

router.get('/auth/sign-up', authController.getSignUp);

module.exports = router;
