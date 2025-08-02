const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: String,
  isDone: Boolean,
  id: String, 
});

module.exports = mongoose.model("Task", taskSchema);
