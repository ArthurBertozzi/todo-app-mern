// backend/routes/tasks.js

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Endpoint para obter todas as tarefas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para criar uma nova tarefa
router.post("/", async (req, res) => {
  const { title, description, checklist } = req.body;

  const task = new Task({
    title,
    description,
    checklist,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para atualizar uma tarefa
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.completed !== undefined) task.completed = req.body.completed;
    if (req.body.checklist) task.checklist = req.body.checklist;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para deletar uma tarefa
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
