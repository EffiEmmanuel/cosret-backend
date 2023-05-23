// @ts-nocheck
import express from "express";
import {
  createNonFunctionalRequirement,
  deleteNonFunctionalRequirement,
  getNonFunctionalRequirements,
  getNonFunctionalRequirementById,
  updateNonFunctionalRequirement,
} from "../controllers/NonFunctionalRequirement.controllers.js";
const nonFunctionalRequirementRouter = express.Router();

nonFunctionalRequirementRouter
  .route("/")
  .get(getNonFunctionalRequirements)
  .post(createNonFunctionalRequirement);

nonFunctionalRequirementRouter
  .route("/:functionalRequirementId")
  .get(getNonFunctionalRequirementById)
  .put(updateNonFunctionalRequirement)
  .delete(deleteNonFunctionalRequirement);

export default nonFunctionalRequirementRouter;
