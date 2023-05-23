// @ts-nocheck
import express from "express";
import {
  createFunctionalRequirement,
  deleteFunctionalRequirement,
  getFunctionalRequirements,
  getFunctionalRequirementById,
  updateFunctionalRequirement,
} from "../controllers/FunctionalRequirement.controllers.js";
const functionalRequirementRouter = express.Router();

functionalRequirementRouter
  .route("/")
  .get(getFunctionalRequirements)
  .post(createFunctionalRequirement);

functionalRequirementRouter
  .route("/:functionalRequirementId")
  .get(getFunctionalRequirementById)
  .put(updateFunctionalRequirement)
  .delete(deleteFunctionalRequirement);

export default functionalRequirementRouter;
