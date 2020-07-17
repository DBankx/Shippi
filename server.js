// server setup

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;

// cors middleware
app.use(cors());

// home page
app.get('/', (req, res) => {
  res.send('Welcome to shippi');
});

// user route
app.use('/api/user', require('./routes/api/user'));
// product route
app.use('/api/product', require('./routes/api/product'));

app.listen(port, () => console.log(`App has started on port ${port}`));
