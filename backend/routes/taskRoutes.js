import express from 'express';
import { createTask, getTasksByProject, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/:projectId', getTasksByProject);
router.delete('/:id', deleteTask);

export default router;
