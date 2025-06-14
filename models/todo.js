const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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
});

module.exports = mongoose.model("Todo", todoSchema);