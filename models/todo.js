const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    total: {
        type: String,
    },
    income: {
        type: String,
    },
    kharcha: {
        type: String,
    },
    profit: {
        type: String,
    },
    loss: {
        type: String,
    },
    date: {
        type: String,
    }
});

module.exports = mongoose.model("Todo", todoSchema);