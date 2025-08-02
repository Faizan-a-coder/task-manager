const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(8080, () => console.log("Server started on port 8080"));
