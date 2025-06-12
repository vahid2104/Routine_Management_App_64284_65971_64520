import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user._id });
  res.json(projects);
};

export const createProject = async (req, res) => {
  const { title, description } = req.body;
  const project = await Project.create({
    title,
    description,
    userId: req.user._id
  });
  res.status(201).json(project);
};

export const deleteProject = async (req, res) => {
  await Project.deleteOne({ _id: req.params.id, userId: req.user._id });
  res.status(204).end();
};

