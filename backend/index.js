// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const taskRoutes = require("./routes/task");
// const userRoutes = require('./routes/user')
// const path = require("path")
// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("http://localhost:5021/api", taskRoutes);
// app.use('/users',userRoutes);
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'..','task-app','dist','index.html'));
//   })
// app.listen(5021, () => console.log("Server running on port 5000"));
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(cors()); 
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


// Serve frontend (if applicable)
app.use(express.static(path.join(__dirname, "..", "task-app", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "task-app", "dist", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5021;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
