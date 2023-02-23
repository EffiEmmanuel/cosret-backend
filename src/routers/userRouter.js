import express from "express";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
  loginUser,
  updateUser,
} from "../controllers/User.controllers.js";
const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(createUser);
userRouter
  .route("/:userId")
  .get(getUserById)
  .delete(deleteUser)
  .put(updateUser);

userRouter.post("/login", loginUser);
userRouter.get("/email/:userEmail", getUserByEmail);
userRouter.get("/username/:username", getUserByUsername);

export default userRouter;
