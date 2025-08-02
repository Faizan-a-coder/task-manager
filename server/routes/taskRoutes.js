const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task
router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.deleteOne({ id: req.params.id });
  res.json({ message: "Deleted" });
});

// Toggle isDone
router.put("/:id", async (req, res) => {
  const task = await Task.findOne({ id: req.params.id });
  task.isDone = !task.isDone;
  await task.save();
  res.json(task);
});

module.exports = router;
