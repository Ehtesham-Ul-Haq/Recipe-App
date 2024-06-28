const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MONGODB_URI="mongodb://localhost:27017/recipe_app"

dotenv.config();

console.log('MONGODB_URI:',MONGODB_URI); // Add this line to debug


const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
