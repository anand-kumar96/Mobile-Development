const express = require('express');
const { createTodo, deleteTodo, updateTodo, getTodo, getAllTodo } = require('../controllers/todoController');

const router = express.Router();
router.post('/createTodo',createTodo);
router.delete('/deleteTodo/:id',deleteTodo);
router.patch('/updateTodo/:id',updateTodo);
router.get('/getTodo/:id',getTodo);
router.get('/getAllTodo',getAllTodo);
module.exports = router