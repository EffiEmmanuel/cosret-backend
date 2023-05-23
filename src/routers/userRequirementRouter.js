// @ts-nocheck
import express from "express";
import {
  createUserRequirement,
  deleteUserRequirement,
  getUserRequirements,
  getUserRequirementById,
  updateUserRequirement,
  getURSystemRequirementsByURId,
  getUserRequirementByProjectId,
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
  "/:userRequirementId/functional-requirements",
  getURSystemRequirementsByURId
);

userRequirementRouter.get(
  "/:userRequirementId/non-functional-requirements",
  getURSystemRequirementsByURId
);

userRequirementRouter.get(
  "/project-requirements/:userId/:projectId",
  getUserRequirementByProjectId
);

export default userRequirementRouter;
