// backend/models/Task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  checklist: [
    {
      action: {
        type: String,
        required: true,
      },
      isDone: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
