const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    login: Joi.string().min(2).max(40).required(),
    password: Joi.string().alphanum().min(8).required(),
    age: Joi.number().min(4).max(130).required()
});

const updateSchema = Joi.object({
    login: Joi.string().min(2).max(40),
    password: Joi.string().alphanum().min(8),
    age: Joi.number().min(4).max(130)
});

module.exports = {
    authSchema,
    updateSchema
};
