const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      serverSelectionTimeoutMS: 10000, 
      family: 4 
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
