const Joi = require('joi');

module.exports.joiUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).required();

module.exports.handleJoiUserErrors = (err) => {
  console.log(err.code, err.message);

  let errors = {
    email: '',
    password: '',
    name: '',
  };

  // no password entered
  if (err.message.includes('"password" is not allowed to be empty')) {
    errors.password = 'Password cannot by empty';
  }
  if (err.message.includes('"password" is required')) {
    errors.password = 'Password cannot by empty';
  }
  // no name entered
  if (err.message.includes('"name" is not allowed to be empty')) {
    errors.name = 'Name cannot by empty';
  }
  if (err.message.includes('"name" is required')) {
    errors.name = 'Name cannot by empty';
  }
  // no email entered
  if (err.message.includes('"email" is not allowed to be empty')) {
    errors.email = 'Email cannot by empty';
  }
  if (err.message.includes('"email" is required')) {
    errors.email = 'Email cannot by empty';
  }
  // password not long enough
  if (
    err.message.includes('"password" length must be at least 8 characters long')
  ) {
    errors.password = 'Password must be at least 8 characters';
  }
  // password not long enough
  if (
    err.message.includes('"value" length must be at least 8 characters long')
  ) {
    errors.password = 'Password must be at least 8 characters';
  }
  // email invalid format
  if (err.message.includes('"email" must be a valid email')) {
    errors.email = 'Email must be valid';
  }

  return errors;
};
