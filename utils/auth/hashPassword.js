const { genSalt, hash } = require('bcrypt');

module.exports.hashPassword = async function (password) {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);

  return hashedPassword;
};
