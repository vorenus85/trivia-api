const mongoose = require("mongoose");
const Question = require("./models/Question");
const connectDB = require("./config/db");

const data = [];

const populateDB = async () => {
  await connectDB();
  await Question.insertMany(data);
  console.log("Database populated");
  mongoose.connection.close();
};

populateDB();
