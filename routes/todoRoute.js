const { Router } = require("express");
const router = Router();
const { createTodo, updateTodo, getAllTodo, deleteTodo, getTodoById } = require('../controllers/Todo');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/create').post(isAuthenticated, createTodo);
router.route('/getAllTodo').get(isAuthenticated, getAllTodo);
router.route('/deleteTodo').delete(isAuthenticated, deleteTodo);
router.route('/update/:todoId').put(isAuthenticated, updateTodo);
router.post("/getTodoById", getTodoById);

module.exports = router;