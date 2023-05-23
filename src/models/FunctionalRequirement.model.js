import mongoose from "mongoose";

const FunctionalRequirement = new mongoose.Schema(
  {
    requirement: {
      type: String,
      required: true,
    },
    engineer: {
      type: mongoose.Types.ObjectId,
      ref: "Engineer",
    },
    userRequirement: {
      type: mongoose.Types.ObjectId,
      ref: "UserRequirement",
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

const FunctionalRequirementModel = mongoose.model(
  "FunctionalRequirement",
  FunctionalRequirement
);
export default FunctionalRequirementModel;
