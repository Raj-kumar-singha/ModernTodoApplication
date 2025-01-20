
const express = require('express'),
    router = express.Router(),
    { register, login } = require('../controllers/authControllers'),
    {
        createTodo,
        getTodo,
        updateTodo,
        deleteTodo,
    } = require('../controllers/todoControllers'),
    { authMiddleware } = require('../middlewares/authMiddleware'),
    { getUsers } = require('../controllers/adminCotrollers'),
    validateRequest = require('../middlewares/validationMiddleware'),
    { todoValidationSchema } = require('../validations/todoValidation'),
    { registerSchema, loginSchema } = require('../validations/userValidation');

//! Auth Routes 
router.post('/auth/register', validateRequest(registerSchema), register);
router.post('/auth/login', validateRequest(loginSchema), login);

//! User Routes
router.get('/users', authMiddleware, getUsers);

//! Todo Routes
router.post('/todo', validateRequest(todoValidationSchema), authMiddleware, createTodo);
router.get('/todo', authMiddleware, getTodo);
router.put('/todo/:_id', validateRequest(todoValidationSchema), authMiddleware, updateTodo);
router.delete('/todo/:_id', authMiddleware, deleteTodo);


module.exports = router;