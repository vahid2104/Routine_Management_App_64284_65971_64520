import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProjects);
router.post("/", protect, createProject);
router.delete("/:id", protect, deleteProject);

export default router;

