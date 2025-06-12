import Task from "../models/Task.js";

export const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ projectId, userId: req.user._id }); 
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    projectId: req.params.projectId,
    userId: req.user._id
  });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { text, projectId } = req.body;
  const task = await Task.create({
    text,
    projectId,
    userId: req.user._id
  });
  res.status(201).json(task);
};

export const deleteTask = async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, userId: req.user._id });
  res.status(204).end();
};

