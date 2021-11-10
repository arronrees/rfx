require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.updateLoginStatus = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findOne({
          where: {
            id: decodedToken.id,
          },
        });
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.checkLoggedInRedirect = (req, res, next) => {
  if (req.path === '/auth/log-in' || req.path === '/auth/sign-up') {
    if (res.locals.user) {
      res.redirect('/');
    } else {
      next();
    }
  }

  if (req.path === '/user/profile') {
    if (res.locals.user) {
      next();
    } else {
      res.redirect('/auth/sign-in');
    }
  }
};
