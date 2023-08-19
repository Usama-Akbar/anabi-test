const Joi = require("joi");

const user_schema = Joi.object({
  userName: Joi.string().required(),
  phoneNumber: Joi.required(),
  emailAdress: Joi.required(),
  DateOfBirth: Joi.required(),
  FullName: Joi.required(),
});

module.exports = user_schema;
