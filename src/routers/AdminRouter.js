import express from "express";
import {
  createAdmin,
  deleteAdminAccount,
  getAdminAccounts,
  getAdminById,
  getAdminByUsername,
  updateAdminUsername,
  loginAdmin,
  verifyToken,
  getStatistics,
  getProjectsWithoutAnEngineer,
  assignEngineerToProject,
} from "../controllers/Admin.controllers.js";
const adminRouter = express.Router();

adminRouter.route("/").get(getAdminAccounts).post(createAdmin);
adminRouter
  .route("/:adminId")
  .get(getAdminById)
  .delete(deleteAdminAccount)
  .put(updateAdminUsername);

adminRouter.post("/login", loginAdmin);
adminRouter.post("/verifyToken", verifyToken);
adminRouter.get("/username/:username", getAdminByUsername);
adminRouter.get("/stats/get-statistics", getStatistics);
adminRouter.get("/projects/pending-assignment", getProjectsWithoutAnEngineer);
adminRouter.put(
  "/projects/assign-engineer/:projectId/:engineerId/:ownerId",
  assignEngineerToProject
);

export default adminRouter;
