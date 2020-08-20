const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes

app.listen(process.env.PORT);