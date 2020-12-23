const express = require("express");
const { findByIdAndUpdate } = require("../models/task");
const router = express.Router();

const Task = require("../models/task");

//Show all the tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find(); //I do the query to the ddbb after the query is completed then i save the results in a const

  res.json(tasks);
});

//Show a specific task
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

//Save a new task
router.post("/", async (req, res) => {
  const { title, description } = req.body; //Obtain the input from the user
  const task = new Task({ title, description }); //Create a new object(task) of the model(class) Task and asign the input from the user to the properties, this is like writing: title=title,description=descrption
  await task.save(); //Save the new task
  res.json({ status: "Task Saved!" });
});

//Update a task
router.put("/:id", async (req, res) => {
  const { title, description } = req.body; //Obtain the input from the user
  const newTask = { title, description }; //Create a new task with the input from the user
  await Task.findByIdAndUpdate(req.params.id, newTask); //Update the task that have the id that was sent via the url
  res.json({ status: "Task Updated!" });
});

//Delete a task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "Task Deleted!" }); //Delete the task that have the id that was sent via the url
});

module.exports = router;
