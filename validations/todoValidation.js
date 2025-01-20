const Joi = require('joi');

const todoValidationSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.base': 'Title must be a string',
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title must not exceed 100 characters',
        }),
    description: Joi.string()
        .min(5)
        .max(500)
        .trim()
        .required()
        .messages({
            'string.base': 'Description must be a string',
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 5 characters long',
            'string.max': 'Description must not exceed 500 characters',
        }),
    status: Joi.string()
        .valid('pending', 'completed')
        .optional()
        .messages({
            'any.only': 'Status must be either "pending" or "completed"',
        })
});

module.exports = { todoValidationSchema };
