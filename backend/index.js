const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task");
const userRoutes = require('./routes/user')
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);
app.use('/users',userRoutes);

app.listen(5019, () => console.log("Server running on port 5000"));
