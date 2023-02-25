// @ts-nocheck
import express from "express";
import {
  createUserRequirement,
  deleteUserRequirement,
  getUserRequirements,
  getUserRequirementById,
  updateUserRequirement,
} from "../controllers/UserRequirement.controllers.js";
const userRequirementRouter = express.Router();

userRequirementRouter
  .route("/")
  .get(getUserRequirements)
  .post(createUserRequirement);

userRequirementRouter
  .route("/:userRequirementId")
  .get(getUserRequirementById)
  .put(updateUserRequirement)
  .delete(deleteUserRequirement);

export default userRequirementRouter;
