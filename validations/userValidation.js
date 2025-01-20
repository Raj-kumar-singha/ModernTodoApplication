const Joi = require('joi');

// Registration Schema
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must not exceed 30 characters',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a valid email',
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid',
    }),
    role: Joi.string().valid('admin', 'user').required().messages({
        'any.only': 'Role must be either "admin" or "user"',
        'string.empty': 'Role is required',
    }),
    password: Joi.string().min(6).max(50).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must not exceed 50 characters',
    }),
});

// Login Schema
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a valid email',
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid',
    }),
    password: Joi.string().min(6).max(50).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must not exceed 50 characters',
    }),
});

module.exports = { registerSchema, loginSchema };
