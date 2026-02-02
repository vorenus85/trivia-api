require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const questionRoutes = require("./routes/question");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
