const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/users/login', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
