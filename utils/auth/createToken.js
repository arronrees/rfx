const jwt = require('jsonwebtoken');

// 1 day in seconds
const maxAge = 24 * 60 * 60;

module.exports.createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
