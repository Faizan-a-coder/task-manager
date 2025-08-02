// const express = require("express");
// const app = express();
// const cors = require("cors");
// const corsOptions ={
//     origin: ["http://localhost:5173"],
// };

// app.use(cors(corsOptions));

// app.get("/", (req,res) =>{
//     res.json([
//         { task: "Buy milk", id: "1", isDone: false },
//         { task: "Finish project", id: "2", isDone: false }
//     ]);
// })

// app.listen(8080, () =>{
//     console.log("app is listening to port 8080")
// });



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
