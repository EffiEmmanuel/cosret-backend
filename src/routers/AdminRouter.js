import express from "express";
import {
  createAdmin,
  deleteAdminAccount,
  getAdminAccounts,
  getAdminById,
  getAdminByUsername,
  updateAdminUsername,
  loginAdmin,
} from "../controllers/Admin.controllers.js";
const adminRouter = express.Router();

adminRouter.route("/").get(getAdminAccounts).post(createAdmin);
adminRouter
  .route("/:adminId")
  .get(getAdminById)
  .delete(deleteAdminAccount)
  .put(updateAdminUsername);

adminRouter.post("/login", loginAdmin);
adminRouter.get("/username/:username", getAdminByUsername);

export default adminRouter;
