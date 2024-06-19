const joi = require("joi");

const baseSchema = {
  email: joi.string().min(6).required().email(),
  password: joi.string().min(6).required(),
};

const registerSchema = {
  ...baseSchema,
  confirmPassword: joi.string().valid(joi.ref("password")).required().strict(),
};

const registerValidation = (data) => {
  const schema = joi.object(registerSchema);
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object(baseSchema);
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
