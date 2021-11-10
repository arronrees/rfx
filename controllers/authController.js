const User = require('../models/User');
const { hashPassword } = require('../utils/auth/hashPassword');
const { createToken } = require('../utils/auth/createToken');

// 1 day in seconds
const maxAge = 24 * 60 * 60;

module.exports.getSignUp = async (req, res) => {
  res.render('auth/sign_up.ejs');
};

module.exports.postSignUp = async (req, res) => {
  const { body } = req;

  const hashedPassword = await hashPassword(body.password);

  const newUser = await User.create({
    ...body,
    password: hashedPassword,
  });

  const token = createToken(newUser.id);

  res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });

  res.json({ success: true });
};
