const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT || 4000;
const dbConnect = require('./config/db');
const userRoute = require('./routes/userRoute');
const todoRoute = require('./routes/todoRoute');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dbConnect();

app.use('/api/v1/user', userRoute);
app.use('/api/v1/todo', todoRoute);
app.use('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Welcome to Ghar Kharch"
    })
})

app.listen(port, () => {
    console.log("Listining on port no. ", port);
})