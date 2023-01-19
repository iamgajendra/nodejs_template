const Joi = require("joi");


module.exports.updateUserValidation = (data) => {
    const schema = Joi.object({
        city: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        department: Joi.string().required(),
        gender: Joi.string().required(),
        name: Joi.string().required(),
        title: Joi.string().required(),
        url: Joi.string().allow(''),
        email: Joi.string().email().required(),
    });
    return schema.validate(data);
}