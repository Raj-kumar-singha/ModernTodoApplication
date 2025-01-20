
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
    { getUsers } = require('../controllers/adminCotrollers');

//! Auth Routes 
router.post('/auth/register', register);
router.post('/auth/login', login);

//! User Routes
router.get('/users', authMiddleware, getUsers);

//! Todo Routes
router.post('/todo', authMiddleware, createTodo);
router.get('/todo', authMiddleware, getTodo);
router.put('/todo/:_id', authMiddleware, updateTodo);
router.delete('/todo/:_id', authMiddleware, deleteTodo);


module.exports = router;