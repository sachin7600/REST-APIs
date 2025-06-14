const Todo = require("../models/todo");

exports.createTodo = async (req, res) => {
    try {
        const { title, description, income, kharcha, date, profit } = req.body;

        if (!income || !kharcha || !date) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }

        const todoCreated = await Todo.create({
            income, kharcha, date
        })
        todoCreated.save();

        return res.status(200).json({
            success: true,
            msg: "Data saved successfully",
            data: todoCreated
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { title, description, date, profit, kharcha, income } = req.body;

        const todoUpdated = await Todo.findByIdAndUpdate(todoId, {
            title,
            description
        }, {
            new: true
        });
        todoUpdated.save();

        return res.status(200).json({
            success: true,
            msg: "Todo updated successfully",
            data: todoUpdated
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.getAllTodo = async (req, res) => {
    try {

        const showAllTodo = await Todo.find({});

        return res.status(200).json({
            success: true,
            msg: "All todo retrived successfully",
            data: showAllTodo
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

exports.getTodoById = async (req, res) => {
    try {
        const { todoId } = req.body;
        const showTodoById = await Todo.find(todoId);

        return res.status(200).json({
            success: true,
            msg: "Todo retrived successfully",
            data: showTodoById
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {

        const { todoId } = req.body;
        const todoDeleted = await Todo.findByIdAndDelete(todoId);

        return res.status(200).json({
            success: true,
            msg: "Todo deleted successfully",
            data: todoDeleted
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}