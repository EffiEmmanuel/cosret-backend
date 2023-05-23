import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  getProjectById,
  getProjectBySlug,
  updateProject,
  getUserProjects,
} from "../controllers/Project.controllers.js";
const projectRouter = express.Router();

projectRouter.route("/").get(getProjects).post(createProject);
projectRouter
  .route("/:userId/:projectId")
  .patch(updateProject)
  .delete(deleteProject);

projectRouter.get("/user/:userId", getUserProjects);
projectRouter.get("/:projectId", getProjectById);
projectRouter.get("/slug/:slug", getProjectBySlug);

export default projectRouter;
