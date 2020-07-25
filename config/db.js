const mongoose = require('mongoose');

const db = "mongodb+srv://Nithin:nopassword@cluster0.aghjt.mongodb.net/Nithin?retryWrites=true&w=majority"

//function for connecting to the database
const connectDB = async () => {
  try {
    await mongoose.connect(db,  {useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;