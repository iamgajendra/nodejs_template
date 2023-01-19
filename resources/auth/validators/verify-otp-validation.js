const Joi = require("joi");


module.exports.verifyOtpValidation = (data) => {
    const schema = Joi.object({
        phone_no: Joi.number().integer().min(1000000000).max(9999999999).required(),
        country_code: Joi.number().integer().min(0).max(999).required(),
        otp: Joi.string().length(4).pattern(/^[0-9]+$/).required()
    });
    return schema.validate(data);
}