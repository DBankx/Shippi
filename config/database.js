require('dotenv').config();
const mongoose = require('mongoose');

// connect to the database
const connectDB = async () => {
  //   try connecting to the mongodb database
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    });

    console.log('Database Connected');
  } catch (err) {
    console.log(err);
    // exit the whole app with an error
    process.exit(1);
  }
};

module.exports = connectDB;
