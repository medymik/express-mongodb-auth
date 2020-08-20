require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./utils/connectDb');
connectDB(process.env.DBURL);

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/users'));

app.listen(process.env.PORT);