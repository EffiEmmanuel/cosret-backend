import express from "express";
import {
  createEngineer,
  deleteEngineer,
  getEngineerByEmail,
  getEngineerById,
  getEngineers,
  loginEngineer,
  markProjectAsDone,
  updateEngineer,
  verifyToken,
} from "../controllers/Engineer.controllers.js";
const engineerRouter = express.Router();

engineerRouter.route("/").get(getEngineers).post(createEngineer);
engineerRouter
  .route("/:engineerId")
  .get(getEngineerById)
  .delete(deleteEngineer)
  .put(updateEngineer);

engineerRouter.post("/login", loginEngineer);
engineerRouter.get("/email/:userEmail", getEngineerByEmail);
engineerRouter.post("/verifyToken", verifyToken);
engineerRouter.post("/mark-project-as-done", markProjectAsDone);

export default engineerRouter;
