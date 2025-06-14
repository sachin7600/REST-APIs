const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT || 4000;
const dbConnect = require('./config/db');
const userRoute = require('./routes/userRoute');
const todoRoute = require('./routes/todoRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cookieParser());
const corsOptions = {
    origin: 'https://rest-apis-usj7.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
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