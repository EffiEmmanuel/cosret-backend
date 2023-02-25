// @ts-nocheck
import express from "express";
import {
  createSystemRequirement,
  deleteSystemRequirement,
  getSystemRequirements,
  getSystemRequirementById,
  updateSystemRequirement,
} from "../controllers/SystemRequirement.controllers.js";
const systemRequirementRouter = express.Router();

systemRequirementRouter
  .route("/")
  .get(getSystemRequirements)
  .post(createSystemRequirement);

systemRequirementRouter
  .route("/:systemRequirementId")
  .get(getSystemRequirementById)
  .put(updateSystemRequirement)
  .delete(deleteSystemRequirement);

export default systemRequirementRouter;
