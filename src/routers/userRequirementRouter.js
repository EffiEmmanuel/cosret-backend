// @ts-nocheck
import express from "express";
import {
  createUserRequirement,
  deleteUserRequirement,
  getUserRequirements,
  getUserRequirementById,
  updateUserRequirement,
  getURSystemRequirementsByURId,
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

userRequirementRouter.get(
  "/:userRequirementId/system-requirements",
  getURSystemRequirementsByURId
);

export default userRequirementRouter;
