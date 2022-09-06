const express = require('express');
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();

const app = express();

// body-parser is a middleware that allows us to accept data in the body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/users/login', require('./routes/userRoutes'));

// Middlewares
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
