// server setup
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const connectDB = require('./config/database');

// connect to the database
connectDB();

// initalizing middleware
app.use(express.json({ extended: false }));
app.use(cors());

// home page
app.get('/', (req, res) => {
  res.send('Welcome to shippi');
});

// user route
app.use('/api/user', require('./routes/api/user'));
// product route
app.use('/api/product', require('./routes/api/product'));
// auth route
app.use('/api/auth', require('./routes/api/auth'));
// profile route
app.use('/api/profile', require('./routes/api/profile'));

app.listen(port, () => console.log(`App has started on port ${port}`));
