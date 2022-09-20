const joi = require("@hapi/joi");

module.exports.registerDriver = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone_number: joi
    .string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  license_number: joi.number().required(),
  car_number: joi.number().required(),
});

module.exports.addLocation = joi.object().keys({
  driver_id:  joi.string().required().min(10).message('Driver ID is not found'),

  latitude: joi.number().required(),
  longitude: joi.number().required(),
});

module.exports.findCab = joi.object().keys({
  latitude: joi.number().required(),
  longitude: joi.number().required(),
});

module.exports.deleteRoundFile = joi.string().required();
