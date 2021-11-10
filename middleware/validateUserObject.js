const { joiUserSchema } = require('../models/joiUser');
const { handleJoiUserErrors } = require('../models/joiUser');

module.exports.validateUserObject = (req, res, next) => {
  const { body } = req;

  const { error } = joiUserSchema.validate(body);

  if (error) {
    const errors = handleJoiUserErrors(error);
    console.log(errors);

    res.status(400).json(errors);
  } else {
    console.log('User object valid');
    next();
  }
};
