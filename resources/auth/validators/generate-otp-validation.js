const Joi = require("joi");


module.exports.generateOtpValidation = (data) => {
    const schema = Joi.object({
        phone_no: Joi.number().integer().min(1000000000).max(9999999999).required(),
        country_code: Joi.number().integer().min(0).max(999).required(),
    });
    return schema.validate(data);
}