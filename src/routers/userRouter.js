import express from "express";
import {
  addStakeholderToProject,
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
  loginUser,
  updateUser,
  verifyToken,
} from "../controllers/User.controllers.js";
const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(createUser);
userRouter
  .route("/:userId")
  .get(getUserById)
  .delete(deleteUser)
  .put(updateUser);

userRouter.post("/login", loginUser);
userRouter.post("/verifyToken", verifyToken);
userRouter.get("/email/:userEmail", getUserByEmail);
userRouter.get("/username/:username", getUserByUsername);
userRouter.patch("/:projectId/add-stakeholder", addStakeholderToProject);

export default userRouter;
