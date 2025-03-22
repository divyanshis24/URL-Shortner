const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbPassword = encodeURIComponent(process.env.DB_PASSWORD); 
    const uri = `mongodb+srv://divyanshi15903:${dbPassword}@urldb.youdq.mongodb.net/?retryWrites=true&w=majority&appName=urlDB`;

    await mongoose.connect(uri, {
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
