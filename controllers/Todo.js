const Todo = require("../models/todo");

// Create Todo
exports.createTodo = async (req, res) => {
    try {
        const { income, kharcha, date } = req.body;

        if (!income || !kharcha || !date) {
            return res.status(400).json({
                success: false,
                msg: "Income, kharcha, and date are required",
            });
        }

        const entryDate = new Date(date);
        const startOfDay = new Date(entryDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(entryDate.setHours(23, 59, 59, 999));

        const existing = await Todo.findOne({
            user: req.user._id,
            date: { $gte: startOfDay, $lte: endOfDay },
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                msg: "An entry for this date already exists. You can edit it.",
                data: existing,
            });
        }

        const todoCreated = await Todo.create({
            user: req.user._id,
            income,
            kharcha,
            date,
            profit: income - kharcha,
        });

        return res.status(200).json({
            success: true,
            msg: "Data saved successfully",
            data: todoCreated,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};


// Update Todo
exports.updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { date, kharcha, income } = req.body;

        if (!date || income == null || kharcha == null) {
            return res.status(400).json({
                success: false,
                msg: "All fields (date, income, kharcha) are required",
            });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { date, income, kharcha },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                msg: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Todo updated successfully",
            data: updatedTodo,
        });
    } catch (error) {
        console.error("Backend update error:", error);
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};


// Get All Todos
exports.getAllTodo = async (req, res) => {
    try {
        const allTodos = await Todo.find({}).sort({ date: -1 }); // sorted by date desc
        return res.status(200).json({
            success: true,
            msg: "All todos retrieved successfully",
            data: allTodos,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};

// Get Todo By ID
exports.getTodoById = async (req, res) => {
    try {
        const { todoId } = req.body;

        if (!todoId) {
            return res.status(400).json({
                success: false,
                msg: "Todo ID is required",
            });
        }

        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({
                success: false,
                msg: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Todo retrieved successfully",
            data: todo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.query;

        if (!todoId) {
            return res.status(400).json({
                success: false,
                msg: "Todo ID is required",
            });
        }

        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                msg: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Todo deleted successfully",
            data: deletedTodo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
        });
    }
};
